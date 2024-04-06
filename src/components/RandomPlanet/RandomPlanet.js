import React, { Component } from 'react'
import SwapiService from '../../services/SwapiService'
import './RandomPlanet.css'
import Spinner from '../../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
export default class RandomPlanet extends Component {
    swapiService = new SwapiService()
    state = {
        planet: {},
        loading: true,
    }

    componentDidMount() {
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, 5000)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    onPlanetLoaded = (planet) => {
        this.setState({ planet, loading: false, error: false })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }
    updatePlanet = () => {
        console.log('update')
        const id = Math.floor(Math.random() * 25) + 3
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }
    render() {
        console.log('render')
        const { planet, loading, error } = this.state

        const hasData = !(loading || error)

        const errorMessage = error ? <ErrorIndicator /> : null
        const spinner = loading ? <Spinner /> : null

        const content = hasData ? <PlanetView planet={planet} /> : null

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {
    const { id, population, rotationPeriod, diametr, name } = planet

    return (
        <React.Fragment>
            <img
                className="planet-image"
                alt="planet"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diametr}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
