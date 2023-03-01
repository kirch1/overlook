const getData = (type) => {
    return fetch('http://localhost:3001/api/v1/' + type).then(data => data.json())
}

export {getData};
