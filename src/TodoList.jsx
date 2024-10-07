import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoList({ todos, setTodos }) {
  const [todo, setTodo] = useState({
    description: "",
    priority: "",
    date: null,
  });

  const gridRef = useRef();

  // Määritetään AG-Gridin taulukon sarakkeet
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "description",
      // Sarakkeen sorttaus kytketty pois päältä
      sortable: false,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "priority",
      filter: true,
      // Priorityn teksti näytetään punaisena, jos priority on "High"
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
      floatingFilter: true,
    },
    {
      field: "date",
      filter: true,
      floatingFilter: true,
      // Formatoi ag-gridissä näytettävän päivämäärän oikein
      valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY"),
    },
  ]);

  const priorities = [{ value: "High" }, { value: "Medium" }, { value: "Low" }];

  const changeDate = (newDate) => {
    setTodo({ ...todo, date: newDate });
  };

  const addTodo = () => {
    if (todo.description == "") {
      alert("A todo cannot be empty.");
    } else if (todo.priority == "") {
      alert("A todo must have a priority.");
    } else if (todo.date == null) {
      alert("A todo must have a date.");
    } else {
      setTodos([...todos, todo]);
      setTodo({ ...todo, description: "", priority: "", date: null });
    }
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  return (
    <>
      <Stack
        mt={2}
        direction='row'
        spacing={2}
        justifyContent='left'
        alignItems='center'>
        <TextField
          label='Description'
          onChange={(event) =>
            setTodo({ ...todo, description: event.target.value })
          }
          value={todo.description}></TextField>
        <TextField
          // Asettaa Priority-alasvetovalikolle minimileveyden
          sx={{ m: 1, minWidth: 120 }}
          label='Priority'
          select
          onChange={(event) =>
            setTodo({ ...todo, priority: event.target.value })
          }
          value={todo.priority}>
          <MenuItem value='High'>High</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Low'>Low</MenuItem>
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
          <DatePicker
            label='Date'
            onChange={(newDate) => changeDate(newDate)}
            value={todo.date}></DatePicker>
        </LocalizationProvider>
        <Button variant='contained' startIcon={<AddIcon />} onClick={addTodo}>
          Add
        </Button>
        <Button
          variant='contained'
          color='error'
          startIcon={<DeleteIcon />}
          onClick={deleteTodo}>
          Delete
        </Button>
      </Stack>
      <div className='ag-theme-material' style={{ width: 700, height: 500 }}>
        {/* Renderöidään AG-Grid */}
        {/* ref antaa pääsyn komponentin metodeihin */}
        {/* params.api sisältää komponentin metodit */}
        {/* AG-Grid taulukon sisältö (rowData)saadaan taulukkomuotoisesta ( [] ) todos-tilamuuttujasta */}
        {/* AG-Grid taulukon sarakkeet (columnDefs) saadaan columnDefs-tilamuuttujasta */}
        {/* rowSelection mode singleRow valitsee kerralla koko rivin */}
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection={{ mode: "singleRow" }}
        />
      </div>
    </>
  );
}

export default TodoList;
