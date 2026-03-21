import './Home.css'

export default function Home() {
    return (
        <section className="home-section container py-5">
            <div className="home-content text-center">
                <h1 className='fw-bold'>Página Inicial</h1>

                <h3>Seja bem-vindo ao projeto CRUD de series !</h3>
                <p>Este projeto permite gerenciar todas as séries de TV que você assistiu.</p>
            </div>
        </section>
    )
}