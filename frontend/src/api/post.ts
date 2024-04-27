export const logout = async () => {
  const req = await fetch(process.env.VITE_HOST_BACKEND_V1 + "logout/", {
    method: "POST",
    credentials: "include",
  });

  const res = await req.json();
  if (req.ok) {
    console.log(res);
    window.location.href = "/login";

    return;
  } else {
    // console.log(res)
  }
};

export const post_req = async (uri: string, data: any) => {
  const req = await fetch(process.env.VITE_HOST_BACKEND_V1 + uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const res = await req.json();
  if (req.ok) {
    return { status: "ok", res: res };
  }
  return { ok: true, res: res };
};
