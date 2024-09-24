class Formatter {
  formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };
  unformatCPF = (cpf) => {
    return cpf.replace(/\D/g, "");
  };
  formatDate = (date) => {
    let newDate = new Date(date);
    let year, month, day;

    year = newDate.getFullYear();
    month = newDate.getMonth() + 1;
    day = newDate.getDate();

    month = month.toString().padStart(2, 0);
    day = day.toString().padStart(2, 0);

    return `${year}-${month}-${day}`;
  };
  formatPhone = (phone) => {
    phone = phone.replace(/\D/g, "");
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };
}

module.exports = new Formatter();
