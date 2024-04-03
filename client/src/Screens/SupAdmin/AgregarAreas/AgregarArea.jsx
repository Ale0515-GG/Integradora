import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CachedIcon from '@mui/icons-material/Cached';
import {  useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import "./AgregarArea.css";
import FormDialog from './Areas/area';

const AgregarArea = () => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [areaNombre, setAreaNombre] = useState("");
    const [areaTipo, setAreaTipo] = useState("");
    const [openAddAreaDialog, setOpenAddAreaDialog] = useState(false);
    const [nombreAreaBuscado, setNombreAreaBuscado] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3001/area");
                setAreas(response.data.data);
            } catch (error) {
                console.error('Error al obtener las áreas:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleRowClick = async (area) => {
        setSelectedArea(area);
    };

    const handleOpenUpdateDialog = (area) => {
        setSelectedArea(area);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };

    const handleUpdateArea = async () => {
        try {
            if (!selectedArea || !selectedArea._id) {
                console.error('Error: No se ha seleccionado un área válida.');
                return;
            }

            await Axios.put(`http://localhost:3001/area/update/${selectedArea._id}`, selectedArea);
            setOpenDialog(false);
            const response = await Axios.get("http://localhost:3001/area/");
            setAreas(response.data.data);
        } catch (error) {
            console.error('Error al actualizar el área:', error.message);
        }
    };

    const handleAddArea = async () => {
        try {
            const newArea = await Axios.post(`http://localhost:3001/area/add`, { Nombre: areaNombre, Tipo: areaTipo });
            setAreas([...areas, newArea.data]);
            setAreaNombre("");
            setAreaTipo("");
            setOpenAddAreaDialog(false); // Cierra la ventana emergente
        } catch (error) {
            console.error('Error al agregar el área:', error.message);
        }
    };

    const handleDeleteArea = async (id) => {
        try {
            await Axios.delete(`http://localhost:3001/area/delete/${id}`);
            setAreas(areas.filter(area => area._id !== id));
        } catch (error) {
            console.error('Error al eliminar el área:', error.message);
        }
    };


    const filteredAreas = areas.filter(area => {
        return area.Nombre && area.Nombre.toLowerCase().includes(nombreAreaBuscado.toLowerCase());
    });
    const navigate = useNavigate(); 

    const handleSedeClick = () => {
        navigate('/AgregarSede');
      };

      
      const handleNombreAreaChange = (event) => {
        setNombreAreaBuscado(event.target.value);
    };

    return (
        <> 
<TextField
    type="text"
    value={nombreAreaBuscado}
    onChange={handleNombreAreaChange}
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

            <div className="Area">
                <div className="Rectangle" />
                
                <input type="text" value={nombreAreaBuscado} onChange={handleNombreAreaChange} placeholder="Buscar Nombre de Área" className='v141_18 ' style={{left: 1050, top: 160}}/>
                <div className="Tablas" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div></div>
                    <h1>     </h1>
                    <div>
                        
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Actualizar</TableCell>

                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAreas.map((area, index) => (
                                    <TableRow key={index} onClick={() => handleRowClick(area)} style={{ cursor: 'pointer', backgroundColor: selectedArea && selectedArea._id === area._id ? '#f0f0f0' : 'white' }}>
                                        <TableCell style={{ paddingLeft: '20px' }}>{area.Nombre}</TableCell>
                                        <TableCell>{area.Tipo}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpenUpdateDialog(area)} size="small" variant="outlined" color="primary" startIcon={<CachedIcon />}>Actualizar</Button>
                                        </TableCell>
                                        
                                        <TableCell>
                                            <Button onClick={() => handleDeleteArea(area._id)} size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
                                        </TableCell> 
                                    </TableRow>
                                    
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Actualizar Área</DialogTitle>
                <DialogContent>
                    {selectedArea && (
                        <>
                            <DialogContentText>
                                Aquí puedes actualizar los datos del área.
                            </DialogContentText>
                        
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombre"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={selectedArea.Nombre}
                                onChange={(e) => setSelectedArea({...selectedArea, Nombre: e.target.value})}
                            />
                            <TextField
                                margin="dense"
                                id="tipo"
                                label="Tipo"
                                fullWidth
                                value={selectedArea.Tipo}
                                onChange={(e) => setSelectedArea({...selectedArea, Tipo: e.target.value})}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdateArea} color="primary">
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
                        id="nombre"
                        label="Nombre del Área"
                        type="text"
                        fullWidth
                        value={areaNombre}
                        onChange={(e) => setAreaNombre(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="tipo"
                        label="Tipo de Área"
                        fullWidth
                        value={areaTipo}
                        onChange={(e) => setAreaTipo(e.target.value)}
                    />
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
            Areas 
        </div>
        <Button color='primary' style={{ left: 400,top: 0}}><FormDialog /></Button>
        <Button onClick={handleSedeClick} color='primary' style={{ left: 500, top: 0, border: '1px solid blue' }}>Sedes</Button>
        </>
    );
};

export default AgregarArea;
