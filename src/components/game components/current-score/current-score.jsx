import React from 'react'

export default function CurrentScore(props) {
  const { score } = props;
  return (
    <>
        Score: {score}
    </>
  )
}
