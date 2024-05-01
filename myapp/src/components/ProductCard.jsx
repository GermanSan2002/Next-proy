import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductCard({ product }){
    return (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
            <CardMedia
                sx={{
                    height: 180,
                    width: '100%',
                    objectFit: 'cover'
                }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXILQLfyEqvjpn4XvpYCGlt6j7kiTMQIK7vnbqNfF3g&s"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Editar</Button>
                <Button size="small">Borrar</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;