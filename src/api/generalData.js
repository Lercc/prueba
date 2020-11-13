import axios from 'axios';
import store from '../store';


//CONSTANTES
// const API_URL = `http://127.0.0.1:8000/api`
const API_URL = `https://laravel-academic-test.herokuapp.com/api`

// const ESTUDIANTE_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiYjA0MjRkMDEzMTllMWU2NzE4NmE3YjJiNDg3MWNiMWJkN2Q0ODBlODY3ODM2MWZkZTllNDc4ZWU3MWJiOGEzOGNlNWViMmFiMmM4NjhjOGYiLCJpYXQiOjE2MDUyMTY2MDUsIm5iZiI6MTYwNTIxNjYwNSwiZXhwIjoxNjA1MjIwMjA1LCJzdWIiOiIxMDAzIiwic2NvcGVzIjpbXX0.TaZq0BIVpZq1_V9WSl8ZOL5PBsZmCxNjFcapvnpGvDmlKkA-jEYKUTakc-tJJLqKwL0JPKI36w2C5G-LdwnMLyqLKmkr1Nxf9BJUBMH4QRLl94Hi3xjj5k4UPJCE0nx4f87wuwfb6Ir-HEOjBotT_j6k3guP_bWhzBMx4dqKmK6B5WHIa5yxzUUN4NBioHSxFiXP8PzCmPvlBrz9f1MxbrAtuASfvd8n4fp5zRlYUc0k0DcR1LoUuMGM-7dmT2UZqRrj6tQQmfEL0bCWJ9wjVrrQKMOpkkVntww6W-ie8iJIODA_qjJiaDcw3D-Yb-9cwO22PtL5e-ic8pXtEv7XuYxnuvZ72Gf9ZTjaGprqMQ-oliLZEP2asIongGRNND2MpvVSw2FKVU4CkK4E4yt_kuBCpAVb2wqJ5duQHpUSK8y0hLckKeuotv1ESvZOM7joSoyVmGg2NqKqjN4a7Dmz1IQNXYF7agYgwbkxqKm0NYrLz_uFMRsvsHtcUpx8LKr1xumFc_dWFanxryZAqKqfOpOwbVd-bFBHqVvsZzjf1N93vH1Qsf3wu_dshQ8m8Mi2isK7TZh3tUwj1RBeZELDOxZPis3X9Q6yw0b2cy8eyylFZkWjykv9RhgWg5iprNggYazdeiuTsH2QtBWPGIVr6j2xG0GkPoZ88GXam-UshY0'

// REQUEST `cycles`
function getCiclos() { 
  const REQUEST = 'cycles'
  const headers = { Authorization : `Bearer ${store.state.estudianteToken.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `careers?per_page=50`
function getCarrerasPorArea(pArea) { 
  const REQUEST = `areas/${pArea}/careers?sort_by=nombre`
  const headers = { Authorization : `Bearer ${store.state.estudianteToken.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `careers?per_page=50`
function getAreas() { 
  const REQUEST = 'areas'
  const headers = { Authorization : `Bearer ${store.state.estudianteToken.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `me`
function getMe() { 
  const REQUEST = 'me'
  const headers = { Authorization : `Bearer ${store.state.estudianteToken.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


//Exportamos la funcion para poder usarla más tarde
export { getCiclos, getCarrerasPorArea, getMe, getAreas }