import React, { Component } from 'react'
import backgroundLight from './assets/backgroundLight.jpeg'
import backgroundDark from './assets/backgroundDark.jpeg'
import mastercardLight from './assets/mastercardLight.png'
import mastercardDark from './assets/mastercardDark.png'
import visaDark from './assets/visaDark.png'
import visaLight from './assets/visaLight.png'
import americanExpress from './assets/americanExpress.png'
import chip from './assets/chip.png'
import { Title } from '@mantine/core';
import './Card.css'

const formatCC = (numbers) => {
  return String(numbers).replace(/\d{4}(?=.)/g, "$& ");
};
export default class Card extends Component {

  static defaultProps = {
    bankName: 'Bank Name',
    cardHolder: 'Card Holder',
    cardNumber: '****************',
    issuer: '',
    cardExpire: '13/37',
    theme: 'light',
  }

  formatCardNumber = () => this.props.cardNumber.match(/.{4}/g).join(' ');

  currentTheme = () => {
    const { theme } = this.props

    let currentTheme = null

    switch(theme) {
      case 'light':
        currentTheme = {
          color: 'black',
          background: `url(${backgroundLight})`,
        }
        break
      case 'dark':
        currentTheme = {
          color: 'white',
          background: `url(${backgroundDark})`,
        }
        break
      default:
    }

    return currentTheme
  }

  renderIssuer = () => {
    const { issuer, theme } = this.props
    
    if (issuer === '') {
      return
    }

    let logo = null
    let style = null

    switch(issuer) {
      case 'mastercard':
        logo = theme === 'dark' ? mastercardDark : mastercardLight
        style = 'Card-mastercard-logo'
        break
      case 'visa':
        logo = theme === 'dark' ? visaDark : visaLight
        style = 'Card-visa-logo'
        break
      case 'american':
        logo = theme === 'dark' ? americanExpress : americanExpress
        style = 'Card-american-logo'
        break
      default:
    }

    return <img src={logo} className={style} alt='card logo'/>
  }

  render() {
    const { bankName, cardHolder, cardExpire } = this.props
    const currentTheme = this.currentTheme()

    const theme = (_theme) => ({
      color: this.props.theme === 'dark' ? _theme.colors.dark[0] : _theme.colors.gray[6]
    })

    return (
      <div className="Card-container" style={{ backgroundImage: currentTheme.background }}>
        <div className="Card-bank-name" style={{ color: currentTheme.color }}>
        <Title sx={theme}>{bankName}</Title>
        </div>
        <img src={chip} className="Card-chip" alt='Chip'/>
        <div className="Card-bank-number" style={{ color: currentTheme.color }}>
          <Title order={3} sx={theme}>{formatCC(this.props.cardNumber)}</Title>
        </div>
        <div className="Card-bottom-row">
          <div className="Card-name-holder" style={{ color: currentTheme.color }}>
            <Title order={6} sx={theme}>{cardHolder} | Expire: {cardExpire}</Title>
          </div>
          {this.renderIssuer()}
        </div>
      </div>
    )
  }
}