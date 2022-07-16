window.onload = () => {
    if (location.href === "file:///home/aisha/Escritorio/Proyectos/Lista%20de%20tareas/index.html") {
        console.log(location);
        //SELECTORES DE LOS ELEMENTOS INDEX.HTML
        let task_container = document.querySelector('#container');
        let btn_save = document.querySelector('#btn-save');
        let _limit = document.querySelector('#time-limit');

        // VARIABLE GLOBAL PARA EL TIME_LIMIT
        var arr_limit = [];

        //CALCULOS PARA OBTENER DIAS/HORAS/MIN/SEG
        const milliseconds_second = 1000;
        const milliseconds_minute = milliseconds_second * 60;
        const milliseconds_hour = milliseconds_minute * 60;
        const milliseconds_day = milliseconds_hour * 24

        // MINIMO LA FECHA LIMITE
        _limit.min = new Date().toISOString().substring(0,16);

        //BORRAR LIMITE
        function remove_limit(task_NL, task) {
            let arr_task = [...task_NL];
            let task_i = arr_task.indexOf(task);
            arr_limit.splice(task_i, 1);
        }

        // BORRA LA TAREA
        function remove(e) {
            let task = document.querySelectorAll('.task');
            remove_limit(task, e);
            e.remove();
        }

        // FUNCION DEL CRONOMETRO
        const countdown_starts = (time_left) => {
            let days = Math.floor(time_left/milliseconds_day);
            let hours = Math.floor((time_left % milliseconds_day)/milliseconds_hour);
            let minutes = Math.floor((time_left % milliseconds_hour)/milliseconds_minute);
            let seconds = Math.floor((time_left % milliseconds_minute)/milliseconds_second);
            _time = [days, hours, minutes, seconds];    
            
            return _time
        }

        // QUE EL CRONOMETRO SIGA FUNCIONANDO
        // !!MIRAR SI PUEDO OBTIMIZARLO USANDO LA FUNCION COUNTDOWN START!!
        const countdown = () => {
            let _task = document.querySelectorAll('.task');
            for (let i = 0; i < _task.length; i++) {
                let now = new Date();
                let time_left2 = arr_limit[i] - now;
                if (arr_limit[i] != '' && time_left2 > 0) {
                    countdown_starts(time_left2);
                    _task[i].getElementsByClassName('days')[0].textContent = 'D\r\n' + _time[0];
                    _task[i].getElementsByClassName('hours')[0].textContent = 'H\r\n' + _time[1];
                    _task[i].getElementsByClassName('minutes')[0].textContent = 'M\r\n' + _time[2];
                    _task[i].getElementsByClassName('seconds')[0].textContent = 'S\r\n' + _time[3];
                } else if (time_left2 < 0 && arr_limit[i] != '') {
                    remove_limit(_task, _task[i]);
                    _task[i].remove();
                }
            }
        }

        task_container.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('btn-delete')) {
                let delete_task = e.target.parentNode;
                delete_task.classList.add('removed');
                setTimeout(remove, 450, delete_task);
            }
        })


        // RECOGE LOS DATOS DE LOS INPUTSS Y CREA LA TAREA
        btn_save.addEventListener('click', () => {
            let task_name = document.querySelector('#task-name').value;
            let task_description = document.querySelector('#task-description').value;
            let time_limit = _limit.value;
            let date_limit = new Date(time_limit) - new Date();

            if (task_name && task_name != " "){
                if (new Date(time_limit) > new Date() || time_limit == '') {
                    //CREA EL DIV .TASK
                    let task = document.createElement('div');
                    task_container.appendChild(task);
                    task.className = "task"
                
                    //SE CREA EL CONTENIDO DEL DIV .TASK
                    let _name = document.createElement('h3');
                    _name.textContent = task_name;
                    task.appendChild(_name);
                    _name.className = "name";

                    // SE CREA EL CRONOMETRO
                    let date = document.createElement('p');
                    task.appendChild(date);
                    date.className = "date";
                    countdown_starts(date_limit)
                    if (time_limit != '') {
                        //INTRODUCE LA FECHA LIMITE EN EL ARRAY
                        arr_limit.push(new Date(time_limit));

                        let date_days = document.createElement('span');
                        date_days.textContent = 'D\r\n' + _time[0];
                        date.appendChild(date_days);
                        date_days.className = "time days";
                        
                        let date_hours = document.createElement('span');
                        date_hours.textContent = 'H\r\n' + _time[1];
                        date.appendChild(date_hours);
                        date_hours.className = "time hours";

                        let date_minutes = document.createElement('span');
                        date_minutes.textContent = 'M\r\n' + _time[2];
                        date.appendChild(date_minutes);
                        date_minutes.className = "time minutes";

                        let date_seconds = document.createElement('span');
                        date_seconds.textContent = "S\r\n" + _time[3];
                        date.appendChild(date_seconds);
                        date_seconds.className = "time seconds";
                    } else {
                        //INTRODUCE STRING VACIO (SIN FECHA LIMITE) EN EL ARRAY
                        arr_limit.push('');
                    }
                    

                    let description = document.createElement('p');
                    description.textContent = task_description
                    task.appendChild(description);
                    description.className = "description";
                    
                    //CREA EL BOTON PARA BORRAR TASK
                    let btn_delete = document.createElement('button');
                    btn_delete.textContent = "Borrar";
                    btn_delete.className = "btn btn-delete";
                    task.appendChild(btn_delete);

                    //LIMPIA LOS INPUTS
                    document.querySelector('#task-name').value = '';
                    document.querySelector('#time-limit').value = '';
                    document.querySelector('#task-description').value = '';

                }
            }
        })
        setInterval(countdown, milliseconds_second);
    } else if (location.href === "file:///home/aisha/Escritorio/Proyectos/Lista%20de%20tareas/login.html"){
        let _enviar = document.querySelector("#enviar");
        let _input = document.querySelector("#valor");
        console.log(_input.value);
        _enviar.addEventListener('click', () => {
        console.log(_input.value);
        localStorage.setItem("nombre", _input.value);
        })
    }
}

