// AgregarSedes.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


import {  useNavigate } from 'react-router-dom';

import "./AgregarSede.css";
import FormDialog from './Sedes/sede';


const AgregarSede = () => {
    const [sedesAreas, setSedesAreas] = useState([]);
    const [selectedSedeArea, setSelectedSedeArea] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [areaNombre, setAreaNombre] = useState("");
    const [areaTipo, setAreaTipo] = useState("");
    const [openAddAreaDialog, setOpenAddAreaDialog] = useState(false);
    const [nombreSedeBuscado, setNombreSedeBuscado] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3001/sede");
                setSedesAreas(response.data.data);
            } catch (error) {
                console.error('Error al obtener las sedes y áreas:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleRowClick = async (sedeArea) => {
        setSelectedSedeArea(sedeArea);
    };

    const handleOpenUpdateDialog = (sedeArea) => {
        setSelectedSedeArea(sedeArea);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };

    const handleUpdateSedeArea = async () => {
        try {
            if (!selectedSedeArea || !selectedSedeArea._id) {
                console.error('Error: No se ha seleccionado una sede o área válida.');
                return;
            }

            await Axios.put(`http://localhost:3001/sede/update/${selectedSedeArea._id}`, selectedSedeArea);
            setOpenDialog(false);
            const response = await Axios.get("http://localhost:3001/sede/");
            setSedesAreas(response.data.data);
        } catch (error) {
            console.error('Error al actualizar la sede o área:', error.message);
        }
    };

    const handleAddArea = async () => {
        if (!selectedSedeArea || !selectedSedeArea._id) {
            console.error('Error: No hay una sede seleccionada.');
            return;
        }

        try {
            const updatedSedeArea = await Axios.put(`http://localhost:3001/sede/update/${selectedSedeArea._id}`, {
                $push: { Areas: { NombreArea: areaNombre, Tipo: areaTipo } }
            });

            const updatedSedesAreas = sedesAreas.map(sedeArea => {
                if (sedeArea._id === selectedSedeArea._id) {
                    return updatedSedeArea.data;
                }
                return sedeArea;
            });

            setSedesAreas(updatedSedesAreas);
            setAreaNombre("");
            setAreaTipo("");
            setOpenAddAreaDialog(false); // Cierra la ventana emergente
        } catch (error) {
            console.error('Error al agregar el área:', error.message);
        }
    };

    const handleDeleteSedeArea = async (id) => {
        try {
            await Axios.delete(`http://localhost:3001/sede/delete/${id}`);
            setSedesAreas(sedesAreas.filter(sede => sede._id !== id));
        } catch (error) {
            console.error('Error al eliminar la sede o área:', error.message);
        }
    };

    const handleNombreSedeChange = (event) => {
        setNombreSedeBuscado(event.target.value);
    };

    const filteredSedesAreas = sedesAreas.filter(sedeArea => {
        return sedeArea.Nombre && sedeArea.Nombre.toLowerCase().includes(nombreSedeBuscado.toLowerCase());
    });
    
    const navigate = useNavigate(); 

    const handleAreaClick = () => {
        navigate('/AgregarArea');
      };

    return (
        <>

<TextField
    type="text"
    value={nombreSedeBuscado}
    onChange={handleNombreSedeChange}
    placeholder="Buscar Nombre de Sede"
    fullWidth
    style={{ marginLeft: '10px', border: 'none', borderBottom: '1px solid grey' }}
    InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <SearchIcon style={{ color: 'grey' }} />
            </InputAdornment>
        ),
        disableUnderline: true, // Esto elimina el borde predeterminado del TextField
    }}
/>


            <div className="Sede">

                <div className="Rectangle" />
                
                <input type="text" value={nombreSedeBuscado} onChange={handleNombreSedeChange} placeholder="Buscar Nombre de Sede" className='v141_18 ' style={{left: 1050, top: 160}}/>
                <div className="Tablas" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div></div>
                    <h1>     </h1>
                    <div>
                        
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    
                                    <TableCell>Actualizar</TableCell>
                                    
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredSedesAreas.map((sedeArea, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleRowClick(sedeArea)}>
                                                    {selectedSedeArea && selectedSedeArea._id === sedeArea._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{sedeArea.Nombre}</TableCell>
                                            <TableCell>{sedeArea.Ubicacion}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleOpenUpdateDialog(sedeArea)} size="small" variant="outlined" color="primary" startIcon={<CachedIcon />}>Actualizar</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteSedeArea(sedeArea._id)} size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
                                            </TableCell> 
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                <Collapse in={selectedSedeArea && selectedSedeArea._id === sedeArea._id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="subtitle1">Áreas:</Typography>
                                                        {sedeArea.Areas.map((area, areaIndex) => (
                                                            <div key={areaIndex}>
                                                                Tipo: {area.Tipo}, Nombre: {area.NombreArea}
                                                            </div>
                                                        ))}
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Actualizar Sede o Área</DialogTitle>
                <DialogContent>
                    {selectedSedeArea && (
                        <>
                            <DialogContentText>
                                Aquí puedes actualizar los datos de la sede o área.
                            </DialogContentText>
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={selectedSedeArea.Nombre}
                                onChange={(e) => setSelectedSedeArea({...selectedSedeArea, Nombre: e.target.value})}
                            />
                            <TextField
                                margin="dense"
                                id="ubicacion"
                                label="Ubicación"
                                type="text"
                                fullWidth
                                value={selectedSedeArea.Ubicacion}
                                onChange={(e) => setSelectedSedeArea({...selectedSedeArea, Ubicacion: e.target.value})}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdateSedeArea} color="primary">
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openAddAreaDialog} onClose={() => setOpenAddAreaDialog(false)}>
                <DialogTitle>Agregar Área</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los detalles del área a agregar.
                    </DialogContentText>
                    {/* Formulario para agregar un área */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombreArea"
                        label="Nombre del Área"
                        type="text"
                        fullWidth
                        value={areaNombre}
                        onChange={(e) => setAreaNombre(e.target.value)}
                    />
                    <TextField
                        select  // Cambia a un campo de selección
                        margin="dense"
                        id="tipoArea"
                        label="Tipo de Área"
                        fullWidth
                        value={areaTipo}
                        onChange={(e) => setAreaTipo(e.target.value)}
                    >
                        <MenuItem value="Administrativa">Administrativa</MenuItem>
                        <MenuItem value="Operativa">Operativa</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddAreaDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAddArea} color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="AgregarNuevoEmpleado" style={{ width: 440, height: 50, left: 80, top: 105, position: 'absolute' ,
            color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
            Sedes 
        </div>
        <Button color='primary' style={{ left: 400,top: 0}}><FormDialog /></Button>
        <Button onClick={handleAreaClick} color='primary' style={{ left: 500, top: 0, border: '1px solid blue' }}>Agregar Áreas</Button>
        </>
    );
};

export default AgregarSede;
