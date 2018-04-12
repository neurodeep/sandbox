#!/bin/bash
#
# [telinta@psh ~]$ cat ~/nikolay/tt199123/check.sh
# nikolay@telinta.com
#
# set -x

i_customer=$1
COMPACT=$2

if [ "x${i_customer}" = "x" ];
then
        echo "Usage: $0 <i_customer> [compact_mode_enabled]"
        exit 1
fi


# get i_env and customer name
RES=`mysql -u root porta-billing -N -e "select concat(i_env, '|', name) from Customers where i_customer = $i_customer"`
if [ "x$RES" = "x" ];
then
        echo Could not find the customer
        exit 1
else
        i_env=`echo "$RES" | cut -d\| -f1`
        name=`echo "$RES" | cut -d\| -f2-`
        if [ "x$name" = "x" ] || [ "x$i_env" = "x" ];
        then
                echo Could not get the customer name
                exit 1
        fi
fi


# get first and last invoices
RES=`mysql -u root porta-billing -N -e "select concat(min(invoice_number), '|', max(invoice_number)) from Invoices where i_env = $i_env and i_customer = $i_customer and is_void = 'N'"`
if [ "x$RES" = "x" ];
then
        echo Could not find first/last invoices
        exit 1
else
        min_invoice_number=`echo "$RES" | cut -d\| -f1`
        max_invoice_number=`echo "$RES" | cut -d\| -f2`
        if [ "x$min_invoice_number" = "x" ] || [ "x$max_invoice_number" = "x" ];
        then
                echo Could not parse invoice numbers
                exit 1
        fi
fi

# okay, get current unallocated payments
RES=`mysql -u root porta-billing -N -e "select unallocated_payments from Customers where i_env = $i_env and i_customer = $i_customer"`
if [ "x$RES" = "x" ];
then
        echo Could not get unallocated payments
        exit 1
else
        unallocated_payments=$RES
fi

# sum invoices
RES=`mysql -u root porta-billing -N -e "select concat(sum(amount_net), '|', sum(payments)) from Invoices where i_env = $i_env and i_customer = $i_customer and is_void = 'N'"`
if [ "x$RES" = "x" ];
then
        echo Could not sum invoice amounts
        exit 1
else
        amount_net=`echo "$RES" | cut -d\| -f1`
        payments=`echo "$RES" | cut -d\| -f2`
        if [ "x$amount_net" = "x" ] || [ "x$payments" = "x" ];
        then
                echo Could not parse invoice sums
                exit 1
        fi
fi

# get opening balance of the first invoice
RES=`mysql -u root porta-billing -N -e "select previous_balance from Invoices where i_env = $i_env and i_customer = $i_customer and is_void = 'N' and invoice_number = $min_invoice_number"`
if [ "x$RES" = "x" ];
then
        echo Could not get previous balance of the first invoice
        exit 1
else
        previous_balance=$RES
fi

# did we have payments after their last invoice?
RES=`mysql -u root porta-billing -N -e "select period_to from Invoices where i_env = $i_env and i_customer = $i_customer and is_void = 'N' and invoice_number = $max_invoice_number"`
if [ "x$RES" = "x" ];
then
        echo Could not get last invoice timestamp
        exit 1
else
        xdrs_from_ts=$RES
fi

RES=`mysql -u root porta-billing -N -e "select sum(charged_amount) from (select charged_amount from CDR_Customers where i_env = $i_env and i_customer = $i_customer and charged_amount < 0 and bill_time > '$xdrs_from_ts' union all select charged_amount from CDR_Accounts where i_env = $i_env and i_customer = $i_customer and charged_amount < 0 and bill_time > '$xdrs_from_ts') as t1"`
if [ "x$RES" = "x" ];
then
        echo Could not get later payments
        exit 1
else
        later_payments=$RES
fi


# print results
if [ "x$COMPACT" = "x" ];
then
        echo "

Environment:            $i_env
Customer id:            $i_customer
Customer name:          $name
First invoice:          $min_invoice_number
Last invoice:           $max_invoice_number
Unallocated:            $unallocated_payments
Previous balance:       $previous_balance
Sum of charges:         $amount_net
Sum of payments:        $payments
Later payments:         $later_payments

Final result:           `echo "$amount_net + $payments + $previous_balance" | bc`"
        echo ''
else
        # does not provide enough information! Can be used only for preparing!
        echo "$amount_net + $payments + $previous_balance" | bc
fi
