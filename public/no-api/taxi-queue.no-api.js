document.addEventListener('alpine:init', () => {

    Alpine.data('TaxiQueue', () => {

        return {
            version: 'no-api-1.0',

            taxis: 0,

            passengers: 0,

            joinQueue() {
                this.passengers += 1;
            },
            
            leaveQueue() {

                if (this.passengers > 0) {
                    this.passengers -= 1;
                }
            },

            joinTaxiQueue() {
                this.taxis += 1;
            },

            queueLength() {
                return this.passengers;
            },

            taxiQueueLength() {
                return this.taxis

            },

            taxiDepart() {
                if (this.passengers >= 12 && this.taxis > 0) {
                    this.taxis -= 1;
                    this.passengers -= 12;
                }

            }
        }

    });

});