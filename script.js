document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const resultadosSection = document.getElementById('resultados');
    const destinosSection = document.getElementById('destinos');
    const itinerariosSection = document.getElementById('itinerarios');
    const contatoSection = document.getElementById('contato');
    const voltarBuscaButton = document.getElementById('voltarBusca');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const destinationInput = document.getElementById('destination').value.toLowerCase();
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);

        if (!startDate || !endDate) {
            alert('Por favor, insira datas válidas.');
            return;
        }

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';

        const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        const destinations = [
            {
                name: 'maceió',
                hotels: [
                    { name: 'Hotel Pajuçara', price: 300, img: 'hotel_pajucara.jpg' },
                    { name: 'Hotel Gunga', price: 400, img: 'hotel_gunga.jpg' },
                    { name: 'Hotel Beira Mar', price: 350, img: 'hotel_beira_mar.jpg' }
                ]
            },
            {
                name: 'porto de galinhas',
                hotels: [
                    { name: 'Hotel Maracaípe', price: 350, img: 'hotel_maracaipe.jpg' },
                    { name: 'Hotel Muro Alto', price: 450, img: 'hotel_muro_alto.jpg' },
                    { name: 'Pousada Recanto', price: 300, img: 'pousada_recanto.jpg' }
                ]
            },
            {
                name: 'punta cana',
                hotels: [
                    { name: 'Resort Saona', price: 500, img: 'resort_saona.jpg' },
                    { name: 'Resort Bávaro', price: 600, img: 'resort_bavaro.jpg' },
                    { name: 'Hotel Catalonia', price: 550, img: 'hotel_catalonia.jpg' }
                ]
            },
            {
                name: 'rio de janeiro',
                hotels: [
                    { name: 'Copacabana Palace', price: 800, img: 'copacabana_palace.jpg' },
                    { name: 'Hotel Fasano', price: 900, img: 'hotel_fasano.jpg' },
                    { name: 'Hotel Ipanema', price: 700, img: 'hotel_ipanema.jpg' }
                ]
            },
            {
                name: 'florianópolis',
                hotels: [
                    { name: 'Costão do Santinho', price: 650, img: 'costao_santinho.jpg' },
                    { name: 'Hotel Majestic', price: 700, img: 'hotel_majestic.jpg' },
                    { name: 'Pousada dos Ingleses', price: 350, img: 'pousada_ingleses.jpg' }
                ]
            }
        ];

        const matchedDestinations = destinations.filter(dest => dest.name.includes(destinationInput));

        if (matchedDestinations.length > 0) {
            matchedDestinations.forEach(destinationData => {
                const destinationHTML = `
                    <div class="col-md-12 mb-4">
                        <h3>Resultados para ${destinationData.name.charAt(0).toUpperCase() + destinationData.name.slice(1)}</h3>
                        <p>Período: ${startDate.toLocaleDateString()} até ${endDate.toLocaleDateString()} (${daysDiff} noites)</p>
                        <div class="row">
                            ${destinationData.hotels.map(hotel => {
                                const totalCost = hotel.price * daysDiff;
                                return `
                                    <div class="col-md-4 mb-4">
                                        <div class="card">
                                            <img src="${hotel.img}" class="card-img-top" alt="${hotel.name}">
                                            <div class="card-body">
                                                <h5 class="card-title">${hotel.name}</h5>
                                                <p class="card-text">R$ ${hotel.price},00/noite</p>
                                                <p class="card-text">Total: R$ ${totalCost},00</p>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
                resultsContainer.innerHTML += destinationHTML;
            });
        } else {
            resultsContainer.innerHTML = `<p>Nenhum destino encontrado para "${destinationInput}".</p>`;
        }

        resultadosSection.style.display = 'block';
        destinosSection.style.display = 'none';
        itinerariosSection.style.display = 'none';
        contatoSection.style.display = 'none';
    });

    voltarBuscaButton.addEventListener('click', () => {
        resultadosSection.style.display = 'none';
        destinosSection.style.display = 'block';
        itinerariosSection.style.display = 'block';
        contatoSection.style.display = 'block';
    });
});
