import RecordItem from '../models/record-item';

const RECORDS = [
    new RecordItem(
        'highest',
        'Highest Score: ',
         0
    ),
    new RecordItem(
        'average',
        'Average Score: ',
         0.00
    ),
    new RecordItem(
        'attempted',
        'Questions Attempted: ',
         0
    ),
    new RecordItem(
        'correct',
        'Correct Questions: ',
         0
    ),
]

export default RECORDS;