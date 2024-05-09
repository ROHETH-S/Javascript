class Contribution {
    constructor(payer, amount) {
        this.payer = payer;
        this.amount = amount;
    }
}

class Participant {
    constructor(name, isBillPayer) {
        this.name = name;
        this.isBillPayer = isBillPayer;
        this.contributions = [];
    }

    addContribution(contribution) {
        this.contributions.push(contribution);
    }
}

class Spot {
    constructor(name) {
        this.name = name;
        this.participants = [];
    }

    addParticipant(participant) {
        this.participants.push(participant);
    }
}

const spots = [];

function addSpot(name) {
    const spot = new Spot(name);
    spots.push(spot);
    return spot;
}

function addParticipant(spot, name, isBillPayer) {
    const participant = new Participant(name, isBillPayer);
    spot.addParticipant(participant);
    return participant;
}

function addContribution(participant, payer, amount) {
    const contribution = new Contribution(payer, amount);
    participant.addContribution(contribution);
}

function calculateBalances() {
    const balances = {};
    const payments = {};

    for (const spot of spots) {
        for (const participant of spot.participants) {
            if (!participant.isBillPayer) {
                balances[participant.name] = balances[participant.name] || 0;
                for (const contribution of participant.contributions) {
                    balances[participant.name] += contribution.amount;
                }
            }
        }

        for (const participant of spot.participants) {
            if (participant.isBillPayer) {
                let totalContribution = 0;
                for (const contribution of participant.contributions) {
                    totalContribution += contribution.amount;
                }
                const share = totalContribution / (spot.participants.length - 1);
                for (const otherParticipant of spot.participants) {
                    if (otherParticipant.name !== participant.name && !otherParticipant.isBillPayer) {
                        balances[otherParticipant.name] = balances[otherParticipant.name] || 0;
                        balances[otherParticipant.name] -= share;
                        balances[participant.name] = balances[participant.name] || 0;
                        balances[participant.name] += share;

                        payments[otherParticipant.name] = payments[otherParticipant.name] || {};
                        payments[otherParticipant.name][participant.name] = share;
                    }
                }
            }
        }
    }

    console.log("Total Balances:");
    for (const participantName in balances) {
        console.log(participantName + ": " + balances[participantName]);
    }

    console.log("\nPayments:");
    for (const payer in payments) {
        for (const payee in payments[payer]) {
            console.log(payer + " owes " + payee + ": " + payments[payer][payee]);
        }
    }
}

function addTrip() {
    const spotName = prompt("Enter trip name:");
    const spot = addSpot(spotName);

    const numParticipants = parseInt(prompt("Enter number of participants:"));
    for (let i = 0; i < numParticipants; i++) {
        const participantName = prompt("Enter participant name:");
        addParticipant(spot, participantName, false);
    }

    const numBillPayers = parseInt(prompt("Enter number of bill payers:"));
    for (let i = 0; i < numBillPayers; i++) {
        const billPayerName = prompt("Enter bill payer name:");
        const billPayerContribution = parseFloat(prompt("Enter amount paid by " + billPayerName + ":"));
        const billPayerParticipant = spot.participants.find(participant => participant.name === billPayerName);
        if (billPayerParticipant) {
            billPayerParticipant.isBillPayer = true;
            addContribution(billPayerParticipant, billPayerName, billPayerContribution);
        } else {
            console.log("Participant '" + billPayerName + "' not found.");
        }
    }

    console.log("Trip '" + spotName + "' added successfully.");
    showOptions();
}

function showOptions() {
    const option = prompt("Options:\n1. Add Trip\n2. Calculate Balances\n3. Exit\nEnter option:");
    switch (option) {
        case "1":
            addTrip();
            break;
        case "2":
            calculateBalances();
            showOptions();
            break;
        case "3":
            console.log("Goodbye!");
            break;
        default:
            console.log("Invalid option.");
            showOptions();
    }
}


showOptions();
