import logo from '../../assets/investment-calculator-logo.png'
import './Header.css'

export default function Header() {
    return (
        <header id='header'>
            <img src={logo} alt='Logo showing a money beg' />
            <h1>React Investment Calculator</h1>
        </header>
    )
}