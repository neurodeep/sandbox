#!/bin/bash

readonly day_hours="${1:-144}"
readonly night_hours="${2:-0}"
readonly holiday_day="${3:-0}"
readonly holiday_night="${4:-0}"
readonly sick="${5:-0}"

# Exchange Rate
readonly xe=$(wget -q -O - "https://finance.google.com/finance/converter?a=1&from=USD&to=UAH" | grep "currency_converter_result" | sed "s/.*bld>\(.*\) UAH.*/\1/m")

# Hourly Rate
readonly rate="8.07"

# Constants
readonly white_ratio="0.35" # В белую начисляется 35% от общей т.е. 10000 + сумма премии до 35% от общей (каждый раз разная величина в зависмости от курса)
readonly advance_ratio="0.5" # У Вас оклад официальный - 10000,00. Аванс 50% от 10000. Может быть не строго 50%. Зависит от дня начисления
readonly tax="0.195" # На налоги уходит 19,5% = 1,5% военный сбор + 18% подоходный налог

if [ -z "$1" ] ; then
	echo "Usage: $0 day_hours [night_hours holiday_day holiday_night sick]"
	exit 0
fi

init_usd=$(bc <<< "(((($day_hours + $sick * 8) - $holiday_day) + ($night_hours - $holiday_night) * 1.25 + $holiday_day * 2 + $holiday_night * 2 * 1.25) * $rate)")
init=$(bc <<< "$init_usd * $xe")

white_init=$(bc <<< "$init * $white_ratio")
white_tax_amount=$(bc <<< "$white_init * $tax")
white_taxed=$(bc <<< "$white_init - $white_tax_amount")
advance=$(bc <<< "$white_taxed * $advance_ratio")
white=$(bc <<< "$white_taxed - $advance")
grey=$(bc <<< "$init * (1 - $white_ratio)")

total=$(bc <<< "$advance + $white + $grey")

cat << EOM
---------------------------------------
Salary prediction:
---------------------------------------
Day hours:              $day_hours
Night hours:            $night_hours
Sick days:              $sick
Holiday day hours:      $holiday_day
Holiday night hours:    $holiday_night
Exchange rate:          $xe
---------------------------------------
USD: $init_usd
UAH: $init
---------------------------------------
Taxes: -$white_tax_amount
Total: $total
---------------------------------------
White: $white_taxed
 ($advance is payed from 15th till 21st current month, $white is payed until 20th next month)
Grey:  $grey
 (payed until 20th next month)
---------------------------------------
EOM

exit 0;
