describe('Api de listar Projetos', () => {
    let autorization = '';
    const tempoEsperado = 4000;
    it('Faz login', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost/api/auth/login',
            body: {
                'email': 'ruigx@hotmail.com',
                'password': '200394'
            }
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('token')
            expect(res.body).to.have.property('refreshToken')
            autorization = res.body.token;
            expect(res.duration).to.be.lte(tempoEsperado)
        })
    })
    it('Realiza chamada de api', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost/api/projetos',
            headers: {'authorization': autorization}
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.duration).to.be.lte(tempoEsperado)
        })
    })
})