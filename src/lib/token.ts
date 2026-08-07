import Cookies from "js-cookie";

function set(name: string, value: string, expiry: Date) {
  Cookies.set(name, value, {
    expires: new Date(expiry),
    secure: true,
    path: "/",
    sameSite: "Lax",
  });
}

function get(name: string) {
  return Cookies.get(name);
}

function remove(name: string) {
  Cookies.remove(name, { secure: true, path: "/", sameSite: "Lax" });
}

export default { set, get, remove };
