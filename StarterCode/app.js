function buildCharts(patientID) {
    d3.json('samples.json').then(data => {
        console.log(data)
        var metadata = data.metadata
        var samples = data.samples
        var filtered_metadata = metadata.filter(patient => patient.id == patientID)[0]
        var filtered_samples = samples.filter(patient => patient.id == patientID)[0]
        console.log(filtered_samples)

        var trace1 = {
            x : filtered_samples.samples.slice(0,10).reverse(),
            y: filtered_samples.slice(0,10).map(otu_id => `OTU #${otu_id}`).reverse(),
            type: 'bar',
            orientation:'h'
        }

        var data = [trace1];
        var layout = {
            title = 'Least Frequently Used Feature'
        }
        plotly.newPlot('barDiv', data, layout)

        trace1 = {
            x: filtered_samples.otu_ids, 
            y: filtered_samples.samples,
            mode: 'markers',
            markers:{
                size = filtered_samples.sample_values,
                color = filtered_samples.otu_ids,
            },
            text: filtered_samples.otu_labels
        };

        var data = [trace1];
        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubbleDiv', data, layout);
        var data = [
            {
                domain : {x : [0, 1], y: [0, 1]},
                value: filtered_metadata.wfreq, 
                title:{text: "Belly Button Washing Frequency"},
                type: "indicator", 
                mode: "gauge+number",
                delta: {reference: 400}, 
                gauge:{axis: {range: [null, 10]}},
            }
        ];
        var layout = {width: 600, height: 600};
    });
};

function populateDemoInfo(patientID) {
    var demoBox = d3.select('#sample-metadata');
    d3.json('samples.json').then(data => {console.log(data)})
}

function changeOption (patientID) {
    console.log(patientID);
    buildCharts(patientID);
    populateDemoInfo(patientID);
}

function popDropdown () {
    var dropdownMenu = d3.select("#selDataset");
    d3.json('samples.json').then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdownMenu.append("option").text(patientID).property("value", patientID)
        })
    })
}

function buildWebsite(){
    popDropdown (),
    d3.json('samples.json').then(data => {
        buildCharts(data.names[0]);
        populateDemoInfo(data.names[0]);
    })
};

buildWebsite();

