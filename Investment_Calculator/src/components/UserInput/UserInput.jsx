import './UserInput.css'

export default function UserInput( { onChange , inputFromUser} ) {
    return (
    <section id='user-input'>
        <div className='input-group'>
            <p>
                <label>Initial Investment</label>
                <input 
                    type='number' 
                    required
                    value={inputFromUser.initialInvestment}
                    onChange={(event) => 
                        onChange('initialInvestment', event.target.value)
                    }
                />
            </p>
            <p>
                <label>Annual Investment</label>
                <input 
                    type='number' 
                    required
                    value={inputFromUser.annualInvestment}
                    onChange={(event) => 
                        onChange('annualInvestment', event.target.value)
                    }
                />
            </p>
        </div>
        <div className='input-group'>
            <p>
                <label>Expexted Reutrn</label>
                <input 
                    type='number' 
                    required
                    value={inputFromUser.expectedReturn}
                    onChange={(event) => 
                        onChange('expextedReturn', event.target.value)
                    }
                />
            </p>
            <p>
                <label>Duration</label>
                <input 
                    type='number' 
                    required
                    value={inputFromUser.duration}
                    onChange={(event) => 
                        onChange('duration', event.target.value)
                    }
                />
            </p>
        </div>
    </section>
    )
}