import { Cancel } from '@mui/icons-material';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

type AddDependentButtonProps = {
  onAddAction: () => void;
};

const AddDependentButton: React.FC<AddDependentButtonProps> = ({
  onAddAction,
}) => {
  return (
    <Button
      sx={{
        background: '#eaf2f9',
        marginBottom: '0.5rem',
      }}
      onClick={onAddAction}
    >
      <Stack direction="row" gap={1}>
        <Typography>Add</Typography>
      </Stack>
    </Button>
  );
};

type DependentsProps = {
  index: number;
  data: React.ReactNode;
  onDelete: (index: number) => void;
};

const Dependents: React.FC<DependentsProps> = ({ index, data, onDelete }) => {
  return (
    <Box
      sx={{
        background: '#283240',
        height: '100%',
        display: 'flex',
        padding: '0.4rem',
        margin: '0 0.5rem 0 0',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#ffffff',
        width: 'max-content',
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            onDelete(index);
          }}
        />
      </Stack>
    </Box>
  );
};

type InputDependentsProps = {
  data: string[];
  onAddDependents: (values: string[]) => void;
};

export default function InputDependents({
  data,
  onAddDependents,
}: InputDependentsProps) {
  const [dependents, setDependents] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);

  const handleDelete = (selectedIndex: number) => {
    const newdependents = dependents.filter(
      (_, index) => index !== selectedIndex
    );
    setDependents(newdependents);
  };
  const handleOnAddClick = () => {
    if (tagRef.current) {
      setDependents((prev) => [...prev, tagRef.current?.value as string]);
      tagRef.current.value = '';
    }
  };

  useEffect(() => {
    setDependents(data);
  }, []);

  useEffect(() => {
    onAddDependents(dependents);
  }, [dependents]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        sx={{ margin: '1rem 0' }}
        margin="none"
        placeholder={dependents?.length < 1 ? 'Enter dependents' : ''}
        InputProps={{
          startAdornment: (
            <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
              {dependents?.map((name, index) => {
                return (
                  <Dependents
                    data={name}
                    index={index}
                    onDelete={handleDelete}
                    key={index}
                  />
                );
              })}
            </Box>
          ),
          endAdornment: <AddDependentButton onAddAction={handleOnAddClick} />,
        }}
      />
    </Box>
  );
}
