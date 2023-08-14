function deleteProp(user, ...args) {
  const aux = user;
  if (aux instanceof Array) {
    aux?.forEach((userItem) => {
      args.forEach((i) => Reflect.deleteProperty(userItem, i));
    });
  }
  if (user) {
    args?.forEach((i) => Reflect.deleteProperty(aux, i));
  }
  return aux;
}

module.exports = { deleteProp };
