const getData = (type) => {
    return fetch('http://localhost:3001/api/v1/' + type)
            .then(response => {
                if(!response.ok){
                    throw new Error(response);
                }
                return response.json();
            })
            .catch(error => console.log(error))
}

export {getData};
