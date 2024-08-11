
const paymentMode = [
    {name:'UPI',value:1},
    { name: 'Cash', value: 2 },
    { name: 'Net Banking', value: 3 },
    { name: 'Debit Card', value: 4 },
    { name: 'Credit Card', value: 5 },
]

const categories = [
    {name: 'Payment', value:1},
    { name: 'Fast Food', value: 2 },
    { name: 'Grocery', value: 3 },
    { name: 'Travelling', value: 5 },
    { name: 'Medical', value: 6 },
    { name: 'Home Equipment', value: 7 },
    { name: 'Clothing', value: 8 },
    { name: 'Electronics', value: 9 },
    { name: 'Other', value: 10 },
]

const secretKey = "AB@123#ab$cd"

export default { paymentMode, categories, secretKey }