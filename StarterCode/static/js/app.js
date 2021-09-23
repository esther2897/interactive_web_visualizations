function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {
        console.log(data)
        var metadata = data.metadata
        var samplevalues = data.samples
        var filteredmetadata = metadata.filter(patient => patient.id == selectedPatientID)[0]
        var filteredsample = samplevalues.filter(patient => patient.id == selectedPatientID)[0]
        console.log(filteredsample)
        // Plotly.newPlot("barDiv", barData, barLayout)
        //* Use `sample_values` as the values for the bar chart.
        // * Use `otu_ids` as the labels for the bar chart.
        // * Use `otu_labels` as the hovertext for the chart.
        var trace1 = {
            x: filteredsample.sample_values.slice(0, 10).reverse(),
            y: filteredsample.otu_ids.slice(0, 10).map(otu_id => `OTU #${otu_id}`).reverse(),
            marker: {
                // color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
            },
            type: 'bar',
            orientation: 'h'
        };
        var data = [trace1];
        var layout = {
            title: 'Least Used Feature'
        };
        Plotly.newPlot('barDiv', data, layout);
        // Plotly.newPlot("bubbleDiv", bubbleData, bubbleLayout)
        // * Use `otu_ids` for the x values.
        // * Use `sample_values` for the y values.        
        // * Use `sample_values` for the marker size.        
        // * Use `otu_ids` for the marker colors.        
        // * Use `otu_labels` for the text values.
        
        var trace1 = {
            x: filteredsample.otu_ids,
            y: filteredsample.sample_values,
            mode: 'markers',
            marker: {
                size: filteredsample.sample_values,
                color: filteredsample.otu_ids,
                colorscale: "Earth"                
            },
            text: filteredsample.otu_labels            
        };
        var data = [trace1];
        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };
        Plotly.newPlot('bubbleDiv', data, layout);
        // Plotly.newPlot("gaugeDiv", gaugeData, gaugeLayout)       
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: filteredmetadata.wfreq,
                title: { text: "Weekly Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 10] } }
            }
        ];
        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gaugeDiv', data, layout);
    })
};
// FUNCTION #2 of 5
function populateDemographicInfo(selectedPatientID) {
    var demographicInfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        console.log(data)
        // ADD APPROXIMATELY 3-6 LINE OF CODE
    })
}
// FUNCTION #3 of 5
function optionChanged(selectedPatientID) {
    console.log(selectedPatientID);
    buildCharts(selectedPatientID);
    populateDemographicInfo(selectedPatientID);
}
// FUNCTION #4 of 5
function populateDropdown() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
    })
}
// FUNCTION #5 of 5
function buildWebsiteOnStartup() {
    populateDropdown();
    d3.json("samples.json").then(data => {
        buildCharts(data.names[0]);
        populateDemographicInfo(data.names[0]);
    })
};
buildWebsiteOnStartup();