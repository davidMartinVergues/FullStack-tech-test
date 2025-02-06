Los modelos estan hechos de tal modo que:

una observacion tiene una coordenadas gps la precision es de 10 m ya q cada coordenada tiene 6 decimales, por lo q puede haber mas de una observacion cn las mismas coordenadas por eso al borrar una observacion no se borra la coordenada solo se borrara cuando no tenga obervacions asociada. es una relacion OneToMany (q coordenada many Observations)

En el front no uso el endpoint que me devuelve la imagen para mejorar temas de rendimiento, uso la url que expone el servidor

considero q si una observacion ya tiene un proceso de identificacion no se puede abrir otro
