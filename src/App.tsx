
import { useMemo, useState } from 'react'
import styles from './app.module.scss'

interface ParkinCar {
  Xposition: number,
  Yposition: number
}

interface RenderRow extends ParkinCar {
  type: string,
}

enum carType {
  SUV = 'yellow',
  SMALL_CAR = 'green',
  BIG_CAR = 'red'
}


function App() {
  const [spaces, setSpaces] = useState([
    ['available', 'unavailable', 'unavailable', 'unavailable', 'available'],
    ['available', 'unavailable', 'unavailable', 'unavailable', 'available'],
    ['available', 'unavailable', 'unavailable', 'unavailable', 'available'],
    ['available', 'unavailable', 'unavailable', 'unavailable', 'available'],
    ['available', 'available', 'available', 'available', 'available'],
  ])

  const [selectedCarType, setSelectedCarType] = useState<carType | undefined>()


  const parkingCar = (props: ParkinCar) => {
    const small  = 1;
    const middle = 2;
    const big = 3

    let carLength = undefined
    
    switch (selectedCarType) {
      case carType.SMALL_CAR:
        carLength = small 
        // if (spaces[props.Yposition][props.Xposition] === 'available') {
          
        //   spaces[props.Yposition][props.Xposition] = carType.SMALL_CAR

        //   setSpaces([...spaces])
        // }
        break

      case carType.SUV:
        carLength = middle
        break

      default:
        carLength = big
        
        break

    }


    const y = props.Yposition -1 > -1 ? props.Yposition - 1: 0
    const x = 0

     // if (spaces[props.Yposition][props.Xposition] === 'available') {
          
        //   spaces[props.Yposition][props.Xposition] = carType.SMALL_CAR

        //   setSpaces([...spaces])
        // }

  }


  const renderRow = ({ type, Xposition, Yposition }: RenderRow) => {
    if (type !== 'unavailable') {
      return <button onClick={() => {
        parkingCar({
          Xposition,
          Yposition
        })
      }} className={`${styles.buttonStyles} ${styles[type]}`}></button>
    }
    if (type === 'unavailable') {
      return <div className={styles.unavailableSpace} ></div>
    }
  }

  const cancelOperation = () => {
    setSelectedCarType(undefined)
  }

  const selectedCar = useMemo(() => {
    switch (selectedCarType) {
      case carType.SMALL_CAR:
        return 'Carro pequeno'

      case carType.SUV:
        return 'Carro SUV'

      case carType.BIG_CAR:
        return 'Caminhão de carga'

      default:
        return 'Não selecionado'
    }

  }, [selectedCarType])

  return (
    <div className={styles.root}>
      <div>
        {spaces.map((row, y) => {
          return <div className={styles.row}>
            {row.map((space, x) => {
              return renderRow({
                type: space,
                Xposition: x,
                Yposition: y
              })
            })}
          </div>
        })}
      </div>
      <div>
        <span> Carro selecionado: {selectedCar} <br /> </span>
        <button onClick={() => setSelectedCarType(carType.SMALL_CAR)} className={styles.greenButton}> Carro Pequeno</button>
        <button onClick={() => setSelectedCarType(carType.SUV)} className={styles.yellowButton}> SUVs </button>
        <button onClick={() => setSelectedCarType(carType.BIG_CAR)} className={styles.redButton}> Veículos de Carga </button>
        <button onClick={cancelOperation} className={styles.cancelButton}> Cancelar operação </button>
      </div>
    </div>
  )
}

export default App
