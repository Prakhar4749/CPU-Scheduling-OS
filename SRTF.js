const processes = [
    { id: "P1", arrival: 0, burst: 7 },
    { id: "P2", arrival: 1, burst: 3 },
    { id: "P3", arrival: 2, burst: 4 },
    { id: "P4", arrival: 3, burst: 5 },
    { id: "P5", arrival: 4, burst: 5 },
    { id: "P6", arrival: 5, burst: 6 }
];

let gaint_chart = []
function scheduling(processes) {

    let current_time= 0;

    let remaining = [...processes];
    remaining.forEach((p) => {
        p.remaining_burst = p.burst
       
    });
    let results = [];

    while (remaining.length > 0) {
        remaining.sort((a, b) => a.remaining_burst - b.remaining_burst);
        let queue = [];
        for (let i = 0; i < remaining.length; i++) {
            if (remaining[i].arrival <= current_time) {
                queue.push(remaining[i].id);
            }
        }




        if (queue.length > 0) {
            const i = remaining.findIndex((p) => p.id === queue[0]);
            const process = remaining[i];

            current_time += 1;
            remaining[i].remaining_burst -= 1;
            gaint_chart.push(process.id)


            if (remaining[i].remaining_burst === 0) {
                remaining[i].turn_around = current_time - process.arrival;
                remaining[i].waiting = remaining[i].turn_around - process.burst;
                results.push(remaining[i]);
                remaining.splice(i, 1);
            }

        } else {

            current_time++;
        }
    }
    return results;
}


const results = scheduling(processes)
console.log(JSON.stringify(results));

function display(processes) {
    console.log(
        "| Process | Arrival Time | Burst Time | Turnaround Time | Waiting Time |"
    );
    console.log(
        "|---------|--------------|------------|-----------------|--------------|"
    );
    processes.forEach((process) => {
        console.log(
            `| ${process.id}      | ${process.arrival.toString().padStart(
                12
            )} | ${process.burst.toString().padStart(10)} | ${process.turn_around
                .toString()
                .padStart(15)} | ${process.waiting.toString().padStart(12)} |`
        );
    });
}

display(results);
console.log("gaint chart -> [" + gaint_chart + "]");

