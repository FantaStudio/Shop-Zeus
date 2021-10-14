export const redirects = (roles, history, location) => {
  console.log(roles);

  if (location?.state?.from) {
    history.replace(location?.state?.from);
  } else if (roles?.includes("Admin")) {
    history.replace("/admin/all-clients");
  } else if (roles?.includes("Client")) {
    history.replace("/");
  }
};
