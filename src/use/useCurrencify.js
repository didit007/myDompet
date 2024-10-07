/* Currency*/

export function useCurrencify (amount){
    //format : "+ Rp 5,000,000.00" | - Rp 3,000,000.00

    let posNegSymbol = ''
    if (amount > 0 ) posNegSymbol = '+'
    else if (amount < 0) posNegSymbol = '-'

    //currency Symbol
    const currencySymbol = '$'

    const amountPositive = Math.abs(amount)

    const amountFormatted = amountPositive.toLocaleString('en-US', {
      minimumFractionDigits:2,
      maximumFractionDigits :2
    })

    return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`
  }