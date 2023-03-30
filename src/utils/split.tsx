import style from './split.module.sass'

type container = 'em' | 'strong'

interface splitProps {
  splitWords?: boolean
  splitChars?: boolean
  textToSplit: string
  charContainer?: container
  charContainerClassName?: string
  wordContainerClassName?: string
  removeSpace?: boolean
}

export const Split = (props: splitProps) => {
  if (!props.splitChars && !props.splitWords) {
    return <>{props.textToSplit}</>
  } else if (props.splitChars && !props.splitWords) {
    return (
      <>
        {props.textToSplit.split('').map((char, i) => {
          if (props.charContainer) {
            if (props.charContainer === 'em') {
              return (
                <em
                  key={char + i}
                  className={`${props.charContainerClassName || ''} ${
                    style.char
                  }`}
                >
                  {char}
                </em>
              )
            } else {
              return (
                <strong
                  key={char + i}
                  className={`${props.charContainerClassName || ''} ${
                    style.char
                  }`}
                >
                  {char}
                </strong>
              )
            }
          } else {
            return (
              <span
                key={char + i}
                className={`${props.charContainerClassName || ''} ${
                  style.char
                }`}
              >
                {char}
              </span>
            )
          }
        })}
      </>
    )
  } else {
    return (
      <>
        {props.textToSplit.split(' ').map((word, i) => {
          return (
            <span
              key={word + i}
              className={`${props.wordContainerClassName || ''} ${style.word}`}
            >
              {props.splitChars ? (
                <>
                  {word.split('').map((char, i) => {
                    if (props.charContainer) {
                      if (props.charContainer === 'em') {
                        return (
                          <em
                            key={char + i}
                            className={`${props.charContainerClassName || ''} ${
                              style.char
                            }`}
                          >
                            {char}
                          </em>
                        )
                      } else {
                        return (
                          <strong
                            key={char + i}
                            className={`${props.charContainerClassName || ''} ${
                              style.char
                            }`}
                          >
                            {char}
                          </strong>
                        )
                      }
                    } else {
                      return (
                        <span
                          key={char + i}
                          className={`${props.charContainerClassName || ''} ${
                            style.char
                          }`}
                        >
                          {char}
                        </span>
                      )
                    }
                  })}
                  {!props.removeSpace ? `\xa0` : ''}
                </>
              ) : (
                word + (!props.removeSpace ? ' ' : '')
              )}
            </span>
          )
        })}
      </>
    )
  }
}
