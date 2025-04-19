import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type ComboBoxProps = {
  onChange: (value: string,) => void;
  value: string;
};

const options = [
  { label: 'Name', value: 'name' },
  { label: 'Date', value: 'uploaded_at' }
];

export default function ComboBox({ value, onChange }: ComboBoxProps) {
  const selectedOption = options.find(option => option.value === value) || null;
    return (
        <Autocomplete
        options={options}
        sx={{
          width: 250,
          '& .MuiInputBase-root': {
            color: 'gray',
            fontSize: '12px',
            height: '41px',
          },
          '& .MuiInputLabel-root': {
            color: 'gray',
            top: '-5px',
            fontSize: '12px',
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -2px) scale(0.75)',
           },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'darkgray',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          }
        }}
        getOptionLabel={(option) => option.label}
        defaultValue={options[0]}
        value={selectedOption}
        onChange={(event, newValue) => {
          onChange(newValue ? newValue.value : '');
        }}
        renderInput={(params) => <TextField {...params} label="Sorting" />}
      />
    );
}