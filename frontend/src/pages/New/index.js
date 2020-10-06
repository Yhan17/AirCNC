import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';


export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },[thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');
        data.append('thumbnail', thumbnail);
        data.append('techs', techs);
        data.append('company', company);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id}
        })

        history.push('/dashboard');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label id="thumbnail" 
                className={thumbnail ? 'has-thumbnail': ''}
                style={{
                    backgroundImage: `url(${preview})` 
                }}>
                    <input 
                    type="file" 
                    onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="camera" />
                </label>

                <label htmlFor="company">Empresa *</label>
                <input 
                type="text" 
                id="company"
                placeholder="Sua Empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
                <input 
                type="text" 
                id="techs"
                placeholder="Quais Tecnologias Usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
                />

                <label htmlFor="prices">Valor Diária * <span>(em branco para gratuito)</span></label>
                <input 
                type="text" 
                id="prices"
                placeholder="Valor da diária"
                value={price}
                onChange={event => setPrice(event.target.value)}
                />

                <button type="submit" className="btn">Salvar</button>
            </form>
        </>
    )
}