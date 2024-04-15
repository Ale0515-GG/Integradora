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
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import "./AgregarSede.css";
import FormDialog from './Sedes/sede';
import { blue, yellow } from '@mui/material/colors';
import { Link } from "react-router-dom";

const AgregarSede = () => {
    const [sedesAreas, setSedesAreas] = useState([]);
    const [selectedSedeArea, setSelectedSedeArea] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [areaNombre, setAreaNombre] = useState("");
    const [openAddAreaDialog, setOpenAddAreaDialog] = useState(false);
    const [nombreSedeBuscado, setNombreSedeBuscado] = useState("");
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Axios.get("http://localhost:3001/sede");
                setSedesAreas(response.data.data);
                const areasResponse = await Axios.get("http://localhost:3001/area");
                setAreas(areasResponse.data.data);
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
            // Encontrar el tipo de área basado en el nombre seleccionado
            const selectedArea = areas.find(area => area.Nombre === areaNombre);
            if (!selectedArea) {
                console.error('Error: No se encontró el área seleccionada.');
                return;
            }
            
            // Agregar el área con el tipo correspondiente
            const updatedSedeArea = await Axios.put(`http://localhost:3001/sede/update/${selectedSedeArea._id}`, {
                $push: { Areas: { NombreArea: areaNombre, Tipo: selectedArea.Tipo } }
            });

            const updatedSedesAreas = sedesAreas.map(sedeArea => {
                if (sedeArea._id === selectedSedeArea._id) {
                    return updatedSedeArea.data;
                }
                return sedeArea;
            });

            setSedesAreas(updatedSedesAreas);
            setAreaNombre("");
            setOpenAddAreaDialog(false); // Cierra la ventana emergente
            setAreas(areas.filter(area => area.Nombre !== areaNombre)); // Elimina el área seleccionada de la lista de opciones

        } catch (error) {
            console.error('Error al agregar el área:', error.message);
        }
    };

    const handleDeleteArea = async (sedeId, areaId) => {
        try {
            await Axios.delete(`http://localhost:3001/sede/deleteArea/${sedeId}/${areaId}`);
            const updatedSedesAreas = sedesAreas.map(sedeArea => {
                if (sedeArea._id === sedeId) {
                    const updatedAreas = sedeArea.Areas.filter(area => area._id !== areaId);
                    return { ...sedeArea, Areas: updatedAreas };
                }
                return sedeArea;
            });
            setSedesAreas(updatedSedesAreas);
        } catch (error) {
            console.error('Error al eliminar el área:', error.message);
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

    const handleDeleteSedeArea = async (id) => {
        try {
            await Axios.delete(`http://localhost:3001/sede/delete/${id}`);
            setSedesAreas(sedesAreas.filter(sede => sede._id !== id));
        } catch (error) {
            console.error('Error al eliminar la sede o área:', error.message);
        }
    };
    

    return (
        <>
            <TextField
                type="text"
                value={nombreSedeBuscado}
                onChange={handleNombreSedeChange}
                placeholder="Buscar Nombre de Sede"
                fullWidth
                style={{ border: 'none', borderBottom: '1px solid grey'}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ color: 'grey' }} />
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                }}
            />

            <div className="Sede">
            <Link to="/" className="salir-imagen" style={{ marginLeft: 'auto' }}></Link>

                <div className="Rectangle" />
                
                <input type="text" value={nombreSedeBuscado} onChange={handleNombreSedeChange} placeholder="Buscar Nombre de Área" className='v141_18 ' style={{left: 1050, top: 160}}/>
                <div className="Tablas" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Actualizar</TableCell>
                                    <TableCell>Areas</TableCell>
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
                                                <Button onClick={() => setOpenAddAreaDialog(true)} size="small" variant="outlined" color="primary" startIcon={<AddIcon />}>Agregar Área</Button>
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
                                                        
                                                        {sedeArea.Areas.length > 0 ? (
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Nombre</TableCell>
                                                                        <TableCell>Tipo</TableCell>
                                                                        <TableCell>Eliminar</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {sedeArea.Areas.map((area, areaIndex) => (
                                                                        <TableRow key={areaIndex}>
                                                                            <TableCell>{area.NombreArea}</TableCell>
                                                                            <TableCell>{area.Tipo}</TableCell>
                                                                            <TableCell>
                                                                                <IconButton size="small" onClick={() => handleDeleteArea(sedeArea._id, area._id)} color="error">
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        ) : (
                                                            <Typography variant="body2">No hay áreas.</Typography>
                                                        )}
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
        <TextField
            select
            margin="dense"
            id="nombreArea"
            label="Nombre del Área"
            fullWidth
            value={areaNombre}
            onChange={(e) => {
                setAreaNombre(e.target.value);
            }}
        >
            {areas
                .filter(area => !selectedSedeArea || !selectedSedeArea.Areas.some(sedeArea => sedeArea.NombreArea === area.Nombre))
                .map((area, index) => (
                    <MenuItem key={index} value={area.Nombre}>{area.Nombre}</MenuItem>
                ))}
        </TextField>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenAddAreaDialog(false)} color="primary">
            Cancelar
        </Button>
        <Button onClick={() => {
            handleAddArea();
            window.location.reload();
        }} color="primary">
            Agregar
        </Button>
    </DialogActions>
</Dialog>






            <div className="AgregarNuevoEmpleado" style={{ width: 440, height: 50, left: 80, top: 100, position: 'absolute' ,
                color: 'black' , fontSize: 30, fontFamily: 'Roboto' , fontWeight: '400' , wordWrap: 'break-word' }}>
                Sedes 
            
            </div>
            
            <Button color='primary' style={{ left: 990,top: -20}}><FormDialog /></Button>
            <Button onClick={handleAreaClick} color='primary' style={{ left: 1100, top: -20, border: '1px solid blue' }}>Áreas</Button>
                            
        </>
        
    );
};

export default AgregarSede;
