
//BUG: for boundary n it checks if n+k (above) are greater but doesn't check if boundary n-m (below) is lower, so 65,100,75 is considered good 
//BUG: string can be entered into boundary field
//DEPLOY

//given grades
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

//key function which allows dynamically update histogram on the website
function recalculateHistogram(){
    //reseting histogram
    let histogram = {
        "A+": 0,
        "A": 0,
        "A-": 0,
        "B+": 0,
        "B": 0,
        "B-": 0,
        "C+": 0,
        "C": 0,
        "C-": 0,
        "D": 0,
        "F": 0
    };
    //calculate new histogram
    for(let i=0;i<grades.length;i++){
        for(let grade in boundaries){
            if(grades[i] >= boundaries[grade]){
                histogram[grade]++;
                break;
            }
        }
    }
    //update HTML
    for(let grade in histogram){
        let elem = document.getElementById('hist_' + grade.toLowerCase());
        elem.textContent = "o".repeat(histogram[grade]);
    }
}

//creating dictionary with grades boundaries
var boundaryID = ['val_max','val_a+', 'val_a', 'val_a-', 'val_b+', 'val_b',
 'val_b-', 'val_c+', 'val_c', 'val_c-', 'val_d', 'val_f'];
var boundaries = {
    "A+": document.getElementById(boundaryID[1]).value,
    "A": document.getElementById(boundaryID[2]).value,
    "A-": document.getElementById(boundaryID[3]).value,
    "B+": document.getElementById(boundaryID[4]).value,
    "B": document.getElementById(boundaryID[5]).value,
    "B-": document.getElementById(boundaryID[6]).value,
    "C+": document.getElementById(boundaryID[7]).value,
    "C": document.getElementById(boundaryID[8]).value,
    "C-": document.getElementById(boundaryID[9]).value,
    "D": document.getElementById(boundaryID[10]).value,
    "F": document.getElementById(boundaryID[11]).value 
};
let inputs = document.getElementsByClassName("input-left");
for(let i=0;i<inputs.length;i++){
    inputs[i].addEventListener('input', function(event){
        let grade = event.target.id.split('val_')[1].toUpperCase();
        boundaries[grade] = Number(event.target.value);
        event.target.style.border = '';
        //check of any of boundaries overlap
        let hasError = false;
        for(let j=0;j<boundaryID.length;j++){
            document.getElementById(boundaryID[j]).style.border = '';
            //check if input is not a number
            if(isNaN(document.getElementById(boundaryID[j]).value)){
                document.getElementById(boundaryID[j]).style.border = '2px solid rgb(224,67,70)';
                hasError = true;
                continue;
            }
            //check if boundary is lower
            if(j < boundaryID.length-1 &&
                Number(document.getElementById(boundaryID[j]).value) <= Number(document.getElementById(boundaryID[j+1]).value)){
                document.getElementById(boundaryID[j]).style.border = '2px solid rgb(224,67,70)';
                hasError = true;
            }
            //check if boundary is higher
            if(j > 0 &&
                Number(document.getElementById(boundaryID[j]).value) >= Number(document.getElementById(boundaryID[j-1]).value)){
                document.getElementById(boundaryID[j]).style.border = '2px solid rgb(224,67,70)';
                hasError = true;
            }
            if(!hasError){
                document.getElementById(boundaryID[j]).style.border = '';
            }
        }
        if(!hasError){
            recalculateHistogram();
        }
    });
}

//adds grade to grades after pressing submit button
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function() {
    let gradeInput = document.getElementById('grade');
    if(gradeInput.value !== '')
        //checking if grade <= max value
        //check if input is not a number
        if(Number(gradeInput.value) <= Number(document.getElementById('val_max').value)
        && !isNaN(gradeInput.value)){
            grades.push(Number(gradeInput.value));
            gradeInput.value = '';
            gradeInput.style.border = "";
            recalculateHistogram();
        } else{
            gradeInput.style.border = "2px solid rgb(224,67,70)";
            gradeInput.value = '';
        }
});
recalculateHistogram();