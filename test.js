const testApi = async () => {
    const response = await fetch("http://localhost:3000/users/insert", {
        method: 'POST',
        body: JSON.stringify({
            arroz: "password"
        }),
        'Content-Type': 'application/json'
    })

    const data = await response.json()
    console.log(data)
}


testApi()