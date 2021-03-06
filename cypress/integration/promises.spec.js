it('Promises',() => { })

const getSomething = () => {
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            resolve('Wander')
            console.debug()
        })
    })
}

const system = () => {
    console.log('Init')
    getSomething().then (some => {
        console.log(`Valor da função getSomething é ${some}`)

    })
    console.log('the end')
}