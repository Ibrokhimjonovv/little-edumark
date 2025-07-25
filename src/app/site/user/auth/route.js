export async function POST(request) {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_STUDENT_CREATE;
    const body = await request.json();
    
    // Validation
    if (!body.username || !body.password) {
      return Response.json({ error: 'Login va parol kiritilishi shart' }, {
        status: 400
      });
    }

    const response = await fetch(`${API_BASE}/students/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data.detail }, {
        status: response.status
      });
    }

    return Response.json(data, { status: 200 });
    
  } catch (error) {
    return Response.json({ error: error.message || 'Server xatosi' }, {
      status: 500
    });
  }
}