export default function validateForm(inputs) {
    const { name, amount, price } = inputs;
  
    if (name.length === 0) {
      return false;
    }
  
    if (amount.length === 0) {
      return false;
    }
  
    if (price.length === 0) {
      return false;
    }
  
    return true;
  }