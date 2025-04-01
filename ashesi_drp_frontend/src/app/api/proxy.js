export async function GET(req) {
    const url = new URL(req.url);
    const apiPath = url.pathname.replace("/api/proxy", ""); // Extract path

    const apiUrl = `http://16.171.195.89:80/adrp${apiPath}`; // Append to backend URL

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
}

export async function POST(req) {
    const url = new URL(req.url);
    const apiPath = url.pathname.replace("/api/proxy", "");

    const body = await req.json();

    const apiUrl = `http://16.171.195.89:80/adrp${apiPath}`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data, { status: response.status });
}
