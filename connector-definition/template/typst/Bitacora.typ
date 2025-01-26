#import "@preview/tiaoma:0.2.0"

#let info = json("info.json")

#set page(
  numbering: "1 de 1",
  header: align(left)[
    #info.lugar
  ],
  
  footer: [
    
    #align(center)[
      #grid(columns: (1fr,1fr),
        
        align(center)[
          #image(info.firma, width: auto, height: auto)
          #info.encargado
          #line(length: 100%,stroke: 0.5pt)
          *Nombre y firma*
        ],

        align(center+horizon)[
          #link(info.web,)[Ver reporte en el browser]
          #tiaoma.qrcode(info.web)
        ]
        
      )
    ]
  ],
  footer-descent: -190%,
)

#show link: underline


#grid(
  columns: (1fr,1fr),
  column-gutter: 5pt,
  align(left)[
    #image(info.background)
  ],


  align(right)[
    #par[
      Folio: #info.folio \
      Fecha y hora de inicio: #info.fecha_y_hora_inicio \
      Fecha y hora de terminación: #info.fecha_y_hora_fin
    ]
  ]
)


#align(left)[
  #par[
   // = #info.lugar \
    \
    Registro: #info.registo \
    RFC: #info.rfc \
    Dirección: #info.direccion, COL. #info.colonia, CP #info.cp, #info.estado
  ]
]

#line(length: 100%,stroke: 0.5pt)

#align(left)[

  #par[
    == #info.actividad
    \
    Descripcion: #info.descripcion ; Activo: #info.activo
    \
    
    #grid(columns: (1fr,1fr))[
      == Evidencia: \

      #for i in info.evidencias{
        grid.cell()[
          #image(i, width: auto, height: auto)
        ]
      }
      
    ]
    
  ]

]

/*
#v(5pt)
#line(length: 100%,stroke: 0.5pt)

#align(center)[
  #grid(columns: (1fr,1fr),
    
    align(center)[
      #image(info.firma, width: auto, height: auto)
      #info.encargado
      #line(length: 100%,stroke: 0.5pt)
      *Nombre y firma*
    ],

    align(center+horizon)[
      #link(info.web,)[Ver reporte en el browser]
      #tiaoma.qrcode(info.web)
    ]
    
  )
]
*/




