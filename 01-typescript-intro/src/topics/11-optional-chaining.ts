
export interface Passenger {
    name: string,
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Lucía',
}

const passenger2: Passenger = {
    name: 'Lucía',
    children: ['Helena', 'Lola'],
}

const returnChildrenNumber = ( passenger: Passenger ): number => {

    const { name, children } = passenger;
    
    //Si children es undefined o valor nulo devuelve 0
    const howManyChildren = children?.length || 0;
    //const howManyChildren = children!.length;
    //'!': nunca vas a recibir un nulo en ese punto
    console.log(name, howManyChildren);

    return howManyChildren;
}


returnChildrenNumber(  passenger1 );