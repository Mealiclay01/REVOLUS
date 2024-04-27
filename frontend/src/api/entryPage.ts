export const authCheck = async (uri: string) => {
  const req = await fetch(process.env.VITE_HOST_BACKEND_V1 + uri, {
    method: "GET",
    credentials: "include",
  });
  // const res = await req.json();
  if (req.ok) {
    return true;
  } else if (req.status === 401) {
    window.location.href = uri === "login-auth/" ? "/" : "/login";
  }
};
