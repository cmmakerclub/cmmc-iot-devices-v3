import React from 'react'
import uuid from 'uuid'

export const initWeightTable = (info, d) => {

  let weightInfo = 0
  let weightD = 0
  let header = []

  if (info.weight !== undefined) {
    weightInfo = info.weight
  }

  if (d.weight !== undefined) {
    weightD = d.weight
  }

  if (weightInfo > weightD) {
    header.push(
      <tr key={uuid()}>
        <th>InfoKey</th>
        <th>Value</th>
      </tr>
      ,
      <tr key={uuid()}>
        <th>DataKey</th>
        <th>Value</th>
      </tr>
    )
  } else {
    header.push(
      <tr key={uuid()}>
        <th>DataKey</th>
        <th>Value</th>
      </tr>,
      <tr key={uuid()}>
        <th>InfoKey</th>
        <th>Value</th>
      </tr>
    )
  }

  return header

}