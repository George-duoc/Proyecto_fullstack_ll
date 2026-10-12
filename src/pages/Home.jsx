import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
    return (
        <main>
            <section className="container-fluid mt-2 mb-2 text-center">
                <h2 className="display-5 fw-bold text-uppercase">Nuestras reliquias, ¡Adelante!</h2>
            </section>

            <section className="container-fluid">
                <Carousel>
                    <Carousel.Item>
                        <img 
                            src="https://preview.redd.it/nissan-skyline-gt-r-r34-one-of-the-most-iconic-japanese-v0-wdc7erjx1plf1.jpeg?width=1080&crop=smart&auto=webp&s=4526eac04a81103a98ab921dd571b940c41b4da8" 
                            className="d-block w-100 imagen-uniforme" 
                            alt="Nissan Skyline" 
                        />
                        <Carousel.Caption className="d-none d-md-block">
                            <h5 className="text-white fw-bold text-uppercase bg-dark bg-opacity-75 d-inline-block px-3 py-2 rounded">Nissan Skyline GT-R R34</h5>
                            <br />
                            <br />
                            <p className="text-white fw-semibold bg-dark bg-opacity-75 d-inline-block px-3 py-1 rounded">Lo mejor de la ingeniería JDM, disfrutalo solo en Automotora X.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                        <img 
                            src="https://hips.hearstapps.com/hmg-prod/images/img-2033-jpg-64bec5598090f.jpg?crop=0.872xw:0.655xh;0.0833xw,0.186xh&resize=1400:*" 
                            className="d-block w-100 imagen-uniforme" 
                            alt="Ford Mustang GT 2024" 
                        />
                        <Carousel.Caption className="d-none d-md-block">
                            <h5 className="text-white fw-bold text-uppercase bg-dark bg-opacity-75 d-inline-block px-3 py-2 rounded">Ford Mustang GT</h5>
                            <br />
                            <p className="text-white fw-semibold bg-dark bg-opacity-75 d-inline-block px-3 py-1 rounded">Si entiendes lo que significa motor Coyote V8 de 4ta generación, esta es tu opción.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                        <img 
                            src="https://www.lamborghinilongisland.com/imagetag/2343/9/l/New-2019-Lamborghini-Huracan-RWD-Coupe-1553631677.jpg" 
                            className="d-block w-100 imagen-uniforme" 
                            alt="Lamborghini Huracan 2019" 
                        />
                        <Carousel.Caption className="d-none d-md-block">
                            <h5 className="text-white fw-bold text-uppercase bg-dark bg-opacity-75 d-inline-block px-3 py-2 rounded">Lamborghini Huracán</h5>
                            <br />
                            <p className="text-white fw-semibold bg-dark bg-opacity-75 d-inline-block px-3 py-1 rounded">El superdeportivo definitivo; furia pura de un v10 atmosférico de 640 caballos de fuerza, inigualable.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
            
            <div id="footer"></div>
        </main>
    )
}