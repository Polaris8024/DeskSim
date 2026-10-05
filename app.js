const ticketList = document.querySelector("#ticket-list"); // Get the ticket list container
const statusFilter = document.querySelector("#status-filter"); // Get the status filter dropdown
const systemState = document.querySelector("#system-state"); // Get the system state container
const ticketCount = document.querySelector("#ticket-count"); // Get the ticket count container

let allTickets = []; // Initialize an array to hold all tickets

function displayTickets(tickets) {
    ticketList.textContent = ""; // Clear the ticket list before displaying new tickets
    ticketCount.textContent = `RECORDS DISPLAYED: ${tickets.length}`; // Update the ticket count display

    if (tickets.length === 0) {
        const noTickets = document.createElement("p"); // Create a paragraph element for no tickets message
        noTickets.textContent = "No tickets found."; // Set the text content to indicate no tickets were found
        ticketList.appendChild(noTickets); // Append the no tickets message to the ticket list
        return; // Exit the function early since there are no tickets to display
    }

tickets.forEach(function(ticket) {
    const ticketCard = document.createElement("article"); // Creates a new ticket card.

    const ticketNumber = document.createElement("h3"); // Create an h3 element for the ticket number
    ticketNumber.textContent = `Ticket #${ticket.id}`; // Set the text content to the ticket ID

    const issue = document.createElement("h4"); // Create an h4 element for the issue
    issue.textContent = ticket.issue; // Set the text content to the ticket issue

    const category = document.createElement("p"); // Create a p element for the category
    category.textContent = `Category: ${ticket.category}`; // Set the text content to the ticket category

    const status = document.createElement("p"); // Create a p element for the status
    status.textContent = `Status: ${ticket.status}`; // Set the text content to the ticket status
    status.classList.add("ticket-status"); // Add a class for styling the status 

    if (ticket.status === "Open") {
        status.classList.add("status-open"); // Add a class for open status
    } else if (ticket.status === "In Progress") {
        status.classList.add("status-in-progress"); // Add a class for in progress status
    } else if (ticket.status === "Closed") {
        status.classList.add("status-closed"); // Add a class for closed status
    }

    const description = document.createElement("p"); // Create a p element for the description
    description.textContent = ticket.description; // Set the text content to the ticket description

    ticketCard.appendChild(ticketNumber); // Append the ticket number to the ticket card
    ticketCard.appendChild(issue); // Append the issue to the ticket card
    ticketCard.appendChild(category); // Append the category to the ticket card
    ticketCard.appendChild(status); // Append the status to the ticket card
    ticketCard.appendChild(description); // Append the description to the ticket card

    ticketList.appendChild(ticketCard); // Places the completed card into <section id = "ticket-list">
});
}


fetch("tickets.json") // Fetch the tickets.json file
    .then(function(response) {
        return response.json(); // Parse the response as JSON
    })
    .then(function(data) {
        allTickets = data; // Store the fetched tickets in the allTickets array
        displayTickets(allTickets); // Call the displayTickets function with the fetched data.
        systemState.textContent = "ONLINE"; // Update the system state to indicate that the system is online
    })

    .catch(function(error) {
        console.error("Error loading tickets:", error); // Log any errors that occur during the fetch operation
        ticketList.textContent = "Unable to load tickets."; // Display an error message in the ticket list container
        systemState.textContent = "ERROR"; // Update the system state to indicate that there was an error loading the tickets
    });

statusFilter.addEventListener("change", function() {
    const selectedStatus = statusFilter.value; // Get the selected status from the dropdown

    if (selectedStatus === "all") {
        displayTickets(allTickets); // If "all" is selected, display all tickets
        return; // Exit the function early
    }

    const filteredTickets = allTickets.filter(function(ticket) {
        return ticket.status.toLowerCase().replace(" ", "-") === selectedStatus; // Filter tickets based on the selected status
    });

    displayTickets(filteredTickets); // Display the filtered tickets
});