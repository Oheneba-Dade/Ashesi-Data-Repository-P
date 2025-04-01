export default async function handler(req, res) {
    const apiUrl = `http://16.171.195.89:80/adrp${req.url.replace("/api/proxy", "")}`;

    const response = await fetch(apiUrl, {
        method: req.method,
        headers: {
            ...req.headers,
            host: "16.171.195.89",
            "Content-Type": "application/json",
        },
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
