// AgregarAreas.js
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
import AddIcon from '@mui/icons-material/Add';

import "./AgregarArea.css";

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

    const handleNombreAreaChange = (event) => {
        setNombreAreaBuscado(event.target.value);
    };

    const filteredAreas = areas.filter(area => {
        return area.Nombre && area.Nombre.toLowerCase().includes(nombreAreaBuscado.toLowerCase());
    });

    return (
        <>
            <TextField type="text" value={nombreAreaBuscado} onChange={handleNombreAreaChange} placeholder="Buscar Nombre de Área" style={{ marginLeft: '10px' }} /> 
            <div className="Area">
                <div className="Rectangle" />
                <Button variant="contained" color="primary" onClick={() => setOpenAddAreaDialog(true)} style={{ marginLeft: '10px' }} > Agregar Área </Button>
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
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Actualizar</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAreas.map((area, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleRowClick(area)}>
                                                    {selectedArea && selectedArea._id === area._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{area.Nombre}</TableCell>
                                            <TableCell>{area.Tipo}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleOpenUpdateDialog(area)} size="small" variant="outlined" color="primary" startIcon={<CachedIcon />}>Actualizar</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => setOpenAddAreaDialog(true)} size="small" variant="outlined" color="primary" startIcon={<AddIcon />}>Agregar Sede</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleDeleteArea(area._id)} size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>Eliminar</Button>
                                            </TableCell> 
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                <Collapse in={selectedArea && selectedArea._id === area._id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="subtitle1">No hay subáreas</Typography>
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
                                select  // Cambia a un campo de selección
                                margin="dense"
                                id="tipo"
                                label="Tipo"
                                fullWidth
                                value={selectedArea.Tipo}
                                onChange={(e) => setSelectedArea({...selectedArea, Tipo: e.target.value})}
                            >
                                <MenuItem value="Administrativa">Administrativa</MenuItem>
                                <MenuItem value="Operativa">Operativa</MenuItem>
                            </TextField>
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
                        select  // Cambia a un campo de selección
                        margin="dense"
                        id="tipo"
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
        </>
    );
};

export default AgregarArea;
