#!/bin/bash
for i in `mysql -u root porta-billing -B -e "select distinct C.i_customer from Accounts A join Customers C using (i_customer) where A.i_env=16 and A.bill_status<>'c' and A.id not like '1829%' and A.id not regexp '^([0-9]+#)?[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+$' and A.email <> 'cashier'" | grep -v i_customer`
do
	echo $i
	mysql -u root porta-billing -h porta-billing-master -B -e "UPDATE Customers SET note=CONCAT(IFNULL(note, ''),':AUTOTERMINATE:') WHERE i_customer = $i LIMIT 1145"
done