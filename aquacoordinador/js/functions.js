function loadEquiposList() {
    jQuery.getJSON(URLAPI + "/equipos/equipo/listado/detallado", function (a) {
        var i, e, o, t, n;
        100 == a.codigo &&
            ($.each(a.contenido, function (a, c) {
                if (!$.isEmptyObject(c.PERSONAL) && !$.isEmptyObject(c.UBICACION) && c.activo) {
                    switch (("None" == c.UBICACION.lat && ((c.UBICACION.lat = 41.441523), (c.UBICACION.lng = 2.203042), (c.UBICACION.direccion_gps = "Carrer de Caracas 13, 08030, Barcelona")), c.UBICACION.IDEstado)) {
                        case "10":
                            (o = "green"), (i = "4CAF50"), (e = "000000"), (t = "http://maps.google.com/mapfiles/marker_green.png");
                            break;
                        case "2":
                            (o = "blue"), (i = "2196f3"), (e = "000000"), (t = "http://maps.google.com/mapfiles/ms/micons/blue-dot.png");
                            break;
                        case "7":
                            (o = "orange"), (i = "FF9800"), (e = "000000"), (t = "http://maps.google.com/mapfiles/marker_orange.png");
                            break;
                        case "4":
                            (o = "red"), (i = "f44336"), (e = "000000"), (t = "http://maps.google.com/mapfiles/ms/micons/red-dot.png");
                            break;
                        default:
                            (o = "grey"), (i = "9E9E9E"), (e = "000000"), (t = "http://maps.google.com/mapfiles/marker_grey.png");
                    }
                    "0.0" != c.UBICACION.lat && "None" != c.UBICACION.lat
                        ? ((n = "place"),
                          direccionesEquipo.push(
                              JSON.parse(
                                  '{"latLng":[' +
                                      c.UBICACION.lat +
                                      ", " +
                                      c.UBICACION.lng +
                                      '], "id":"' +
                                      c.id +
                                      '", "address_gps": "' +
                                      c.UBICACION.direccion_gps +
                                      '", "options": {"icon": "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' +
                                      c.nombre +
                                      "|" +
                                      i +
                                      "|" +
                                      e +
                                      '"}}'
                              )
                          ))
                        : ((n = "gps_off"), direccionesEquipo.push(JSON.parse('{"address": "' + c.UBICACION.direccion + '", "id":"' + c.id + '", "address_gps": "' + c.UBICACION.direccion_gps + '", "options": {"icon": "' + t + '"}}'))),
                        listEquipos.push(c),
                        $("#equiposList .collection").append(
                            '<li class="collection-item itemEquipo avatar estadoPS' +
                                c.UBICACION.IDEstado +
                                '" idEquipo="' +
                                c.id +
                                '" idPS="' +
                                c.PS_INFO.ps +
                                '"><i class="material-icons circle ' +
                                o +
                                '">' +
                                n +
                                '</i><span class="title">' +
                                c.nombre +
                                "</span><p>" +
                                c.UBICACION.direccion_gps +
                                "<br>Hora</p></li>"
                        );
                }
            }),
            createMapDirecciones(direccionesEquipo),
            $("#loadingEquipos").hide());
    });
}
function loadEquiposmenu() {
    jQuery.getJSON(URLAPI + "/equipos/servicios/realizados?date1=" + fecha + "&date2=" + fecha2, function (a) {
        100 == a.codigo &&
            $.each(a.contenido.EQUIPOS, function (a, i) {
                $(".collectionEquiposMenu").append('<a href="#!" class="collection-item botonesFiltroPS filtrarEquipo" idEquipo="' + i.id + '"><span class="badge">' + length(i.PS) + "</span>" + i.nombre + "</a>");
            });
    });
}
function loadPersonasmenu() {
    jQuery.getJSON(URLAPI + "/equipos/empleados/con_servicios?fecha1=" + fecha + "&fecha2=" + fecha2, function (a) {
        100 == a.codigo &&
            $.each(a.contenido, function (a, i) {
                $(".collectionPersonasMenu").append(
                    '<a href="#!" class="collection-item botonesFiltroPS filtrarPersona" idPersona="' + i.id + '"><span class="badge">' + i.contador + "</span>" + i.nombre + " " + i.apellido1 + " " + i.apellido2 + "</a>"
                );
            });
    });
}
function length(a) {
    return Object.keys(a).length;
}
function loadTareasList(a) {
    var i = "/equipos/tarea/get_tareas/user/" + TokenID;
    $("#loadingEquipos").show(),
        jQuery.getJSON(URLAPI + i, function (a) {
            100 == a.codigo
                ? ($("#equiposList .collection").empty(),
                  $("#equiposList .collection").append('<li class="collection-item input-field"><input id="buscador" placeholder="Buscar por PS" type="text"></li>'),
                  $.each(a.contenido, function (a, i) {
                      listPS.push(i);
                      var e = Object.keys(i.SUBTAREAS).length;
                      $("#tareasList .collection").append(
                          '<li class="collection-item itemTarea estadoPS' +
                              i.naturaleza_id +
                              '" id="' +
                              i.id + // <div class="col s1">ID: 
                              '"><div class="row">' +
                             // i.id + </div>
                              '<div class="col s1"><b>Emisor:</b><br />' +
                              i.emisor_nombre +
                              "<br /><b>Receptor:</b><br />" +
                              i.receptor_nombre +
                              '</div><div class="col s1"><a href="http://app.aqualyt.net/sf/action.php?SOURCE=PS2&ACTION=SHOWINITIAL&LOAD_PS=' +
                              i.ps +
                              '" target="_blank">PS: ' +
                              i.ps +
                              '</a><br /><a href="#" class="irLugar" idLugar="' +
                              i.lugar_actuacion +
                              '">Lugar: ' +
                              i.lugar_actuacion +
                              '</a></div><div class="col s1"><b>Fecha creación:</b><br />' +
                              moment(i.fecha_crea, "YYYY-MM-DD").format("DD/MM/YYYY") +
                              " " +
                              moment(i.hora).format("HH:mm") +
                              " <br /><b>Fecha solicitud:</b><br />" +
                              moment(i.fecha_soli, "YYYY-MM-DD").format("DD/MM/YYYY") +
                              '</div><div class="col s1"><b>Prioridad:</b><br />' +
                              i.prioridad_string +
                              "<br/><b>Naturaleza:</b><br />" +
                              i.naturaleza_string +
                              '</div><div class="col s6">' +
                              i.accion +
                              '</div><div class="col s1"><a href="#" class="subtareas" idTarea="' +
                              i.id +
                              '">Subtareas (' +
                              e +
                              ')</a><br /><a class="waves-effect waves-light btn cerrartarea" idTarea="' +
                              i.id +
                              '">Cerrar Tarea</a></div><form id="LLOCEDIT' +
                              i.lugar_actuacion +
                              '" action="http://app.aqualyt.net/sf/action.php" method="POST" style="display:none;" target="_blank"><input id="nav_llocedit" name="nav_lloc_edit" type="submit" value="' +
                              i.lugar_actuacion +
                              '" title="ir al Lloc"><input type="hidden" id="ACTIONLLOCEDIT" name="ACTION" value="EDITAR_EXTERNO"><input type="hidden" id="SOURCELLOC" name="SOURCE" value="LUGAR_ACTUACION"><input type="hidden" id="IDLLOCEDIT" name="ID" value="' +
                              i.lugar_actuacion +
                              '"></form></div>'
                      ),
                          $.each(i.SUBTAREAS, function (a, e) {
                              $("#tareasList .collection").append(
                                  '<li class="collection-item itemSubtarea' +
                                      i.id +
                                      '" style="display:none; background-color:#f1f1f1;"><div class="row"><div class="col s1">Autor: ' +
                                      e.emisor_nombre +
                                      '</div><div class="col s1">Fecha:<br />' +
                                      moment(e.fecha, "YYYY-MM-DD").format("DD/MM/YYYY") +
                                      '</div><div class="col s8">Descripción: ' +
                                      e.descripcion +
                                      '</div><div class="col s2"><a href="#" class="btn btn-info" role="button">Editar</a><a href="#" class="btn btn-info" role="button">Guardar</a></div></div></li>'
                              );
                          }),
                          $("#tareasList .collection").append(
                              '<li class="collection-item itemSubtarea' +
                                  i.id +
                                  " itemSubtarea" +
                                  i.id +
                                  'Form" naturalezaTarea="' +
                                  i.naturaleza_id +
                                  '"  destinatarioTarea="' +
                                  i.receptor_id +
                                  '" prioridadTarea="' +
                                  i.prioridad_id +
                                  '" style="display:none; background-color:#f1f1f1"><div class="row"><div class="col s2 input-field personalSelectColumn' +
                                  i.id +
                                  '"><select id="personalSelect' +
                                  i.id +
                                  '"><option value="" disabled selected>Selecciona destinatario</option></select><select id="prioridadSelect' +
                                  i.id +
                                  '"><option value="" disabled selected>Selecciona prioridad</option></select><select id="naturalezaSelect' +
                                  i.id +
                                  '"><option value="" disabled selected>Selecciona naturaleza</option></select></div><div class="col s8"><div class="input-field col s12"><textarea class="materialize-textarea" id="subtarea' +
                                  i.id +
                                  '"></textarea><label for="subtarea' +
                                  i.id +
                                  '">Detalles de la acción</label></div></div><div class="col s2"><a href="#" class="waves-effect waves-light btn addSubtarea" idTarea="' +
                                  i.id +
                                  '">Enviar</a></div></div></li>'
                          ),
                          $("#tareasList .collection").append("</li>");
                  }),
                  $("#loadingEquipos").hide())
                : ($("#loadingEquipos").hide(), Materialize.toast("No hay resultados", 4e3));
        });
}
function contadorPS() {
    jQuery.getJSON(URLAPI + "/equipos/contar_servicios?date1=" + fecha + "&date2=" + fecha2, function (a) {
        100 == a.codigo &&
            $.each(a.contenido, function (a, i) {
                $("#mostrarPendientes .badge").html(i.realizados_sin_validar),
                    $("#mostrarValidadas .badge").html(i.realizados_validados),
                    $("#mostrarAnuladas .badge").html(i.anulados),
                    $("#mostrarNoRealizadas .badge").html(i.no_realizados),
                    $("#mostrarTodas .badge").html(i.total);
            });
    });
}
function loadPSList(a, i) {
    var e = "";
    null != a && (e = "&validacion=" + a + "&estado=" + i), $("#loadingEquipos").show();
    var o = URLAPI + "/equipos/pss/filtrar?fecha1=" + fecha + e + "&fecha2=" + fecha2;
    jQuery.getJSON(o, function (a) {
        var e, o;
        if (100 == a.codigo)
            if (
                ($("#equiposList .collection").empty(),
                $("#equiposList .collection").append('<li class="collection-item input-field"><input id="buscador" placeholder="Buscar por PS" type="text"></li>'),
                $.each(a.contenido, function (a, i) {
                    switch (i.estado_id) {
                        case "10":
                            (e = "green"), "4CAF50", "000000";
                            break;
                        case "2":
                            (e = "blue"), "2196f3", "000000";
                            break;
                        case "7":
                            (e = "orange"), "FF9800", "000000";
                            break;
                        case "4":
                            (e = "red"), "f44336", "000000";
                            break;
                        default:
                            (e = "grey"), "9E9E9E", "000000";
                    }
                    listPS.push(i),
                        (o = "1" === i.validacion ? "check_circle" : ""),
                        $("#equiposList .collection").append(
                            '<li class="collection-item itemPS avatar estadoPS' +
                                i.estado_id +
                                '" idPS="' +
                                i.id +
                                '"><i class="material-icons black-text large circle ' +
                                e +
                                '">' +
                                o +
                                '</i><span class="title">PS ' +
                                i.id +
                                "</span><p>" +
                                i.direccion +
                                "<br />" +
                                i.estado_string +
                                "<br>Fecha: " +
                                i.data_programat +
                                " " +
                                i.hora_finalizacion +
                                "</p></li>"
                        );
                }),
                $("#loadingEquipos").hide(),
                $(".botonesFiltroPS").removeClass("active"),
                null == o)
            )
                $("#mostrarTodas").addClass("active");
            else if (1 === o) $("#mostrarValidadas").addClass("active");
            else
                switch (i) {
                    case 7:
                        $("#mostrarPendientes").addClass("active");
                        break;
                    case 3:
                        $("#mostrarAnuladas").addClass("active");
                        break;
                    case 6:
                        $("#mostrarNoRealizadas").addClass("active");
                }
        else $("#equiposList .collection").empty(), $("#loadingEquipos").hide(), Materialize.toast("No hay resultados", 4e3);
        contadorPS();
    });
}
function loadPSListEquipo(a) {
    $("#loadingEquipos").show();
    var i = URLAPI + "/equipos/pss/realizadas/equipo/" + a + "?fecha1=" + fecha + "&fecha2=" + fecha2;
    jQuery.getJSON(i, function (a) {
        var i, e;
        100 == a.codigo
            ? ($("#equiposList .collection").empty(),
              $("#equiposList .collection").append('<li class="collection-item input-field"><input id="buscador" placeholder="Buscar por PS" type="text"></li>'),
              $.each(a.contenido, function (a, o) {
                  switch (o.estado_id) {
                      case "10":
                          i = "green";
                          break;
                      case "2":
                          i = "blue";
                          break;
                      case "7":
                          i = "orange";
                          break;
                      case "4":
                          i = "red";
                          break;
                      default:
                          i = "grey";
                  }
                  listPS.push(o),
                      (e = "1" === o.validacion ? "check_circle" : ""),
                      $("#equiposList .collection").append(
                          '<li class="collection-item itemPS avatar estadoPS' +
                              o.estado_id +
                              '" idPS="' +
                              o.id +
                              '"><i class="material-icons black-text circle ' +
                              i +
                              '">' +
                              e +
                              '</i><span class="title">PS ' +
                              o.id +
                              "</span><p>" +
                              o.direccion +
                              "<br /> " +
                              o.estado_string +
                              "<br>Fecha: " +
                              o.data_programat +
                              " " +
                              o.hora_finalizacion +
                              "</p></li>"
                      );
              }),
              $("#loadingEquipos").hide())
            : ($("#equiposList .collection").empty(), $("#loadingEquipos").hide(), Materialize.toast("No hay resultados", 4e3));
    });
}
function loadPSListPersona(a) {
    $("#loadingEquipos").show();
    var i = URLAPI + "/equipos/empleado/" + a + "/servicios?fecha1=" + fecha + "&fecha2=" + fecha2;
    jQuery.getJSON(i, function (a) {
        var i, e;
        100 == a.codigo
            ? ($("#equiposList .collection").empty(),
              $("#equiposList .collection").append('<li class="collection-item input-field"><input id="buscador" placeholder="Buscar por PS" type="text"></li>'),
              $.each(a.contenido, function (a, o) {
                  switch (o.estado_id) {
                      case "10":
                          i = "green";
                          break;
                      case "2":
                          i = "blue";
                          break;
                      case "7":
                          i = "orange";
                          break;
                      case "4":
                          i = "red";
                          break;
                      default:
                          i = "grey";
                  }
                  listPS.push(o),
                      (e = "1" === o.validacion ? "check_circle" : ""),
                      $("#equiposList .collection").append(
                          '<li class="collection-item itemPS avatar estadoPS' +
                              o.estado_id +
                              '" idPS="' +
                              o.ps +
                              '"><i class="material-icons black-text circle ' +
                              i +
                              '">' +
                              e +
                              '</i><span class="title">PS ' +
                              o.ps +
                              "</span><p>" +
                              o.direccion +
                              "<br>" +
                              o.estado_string +
                              "<br>Fecha: " +
                              o.data_realizat +
                              "</p></li>"
                      );
              }),
              $("#loadingEquipos").hide())
            : ($("#equiposList .collection").empty(), $("#loadingEquipos").hide(), Materialize.toast("No hay resultados", 4e3));
    });
}
function fillInAddress() {
    var a = autocomplete.getPlace();
    $("#lugarLat").val(a.geometry.location.lat()), $("#lugarLong").val(a.geometry.location.lng()), createMapPSLocation(a.formatted_address);
}
function createMapPSLocation(a, i) {
    psLocationMapLoaded && $("#PSMapLocation").gmap3({ clear: { name: ["marker", "directionsrenderer", "trafficlayer"] } }),
        $("#PSMapLocation").gmap3({
            getlatlng: {
                address: a,
                callback: function (a) {
                    a && $(this).gmap3({ map: { options: { center: a[0].geometry.location, zoom: 15 } }, marker: { latLng: a[0].geometry.location } });
                },
            },
        }),
        (psLocationMapLoaded = !0);
}
function getArrayItembyValue(a, i) {
    return $.grep(a, function (a) {
        return a.id == i;
    });
}
function compareTiempos(a, i) {
    return a.horaEstimada < i.horaEstimada ? -1 : a.horaEstimada > i.horaEstimada ? 1 : 0;
}
function column_sizer() {
    var a = $(window).height() - 110;
    $(".columnHeight").css("height", a);
}
function createMapRutaEquipo(a, i, e) {
    var o = i.direccion + ", " + i.cp + ", " + i.poblacion;
    "None" != i.direccion_gps && (o = i.direccion_gps);
    var t = google.maps.DirectionsTravelMode.DRIVING;
    e && (t = google.maps.DirectionsTravelMode.WALKING),
        (o = o.replace("&#39;", "'")),
        $("#map").gmap3({ clear: { name: ["marker", "directionsrenderer", "trafficlayer"] } }),
        $("#map").gmap3({
            getroute: {
                options: { origin: a, destination: o, travelMode: t },
                callback: function (a) {
                    if (a) {
                        var i = a.routes[0].legs[0],
                            e = i.start_location,
                            o = i.end_location;
                        $(this).gmap3({
                            map: { options: { zoom: 13, center: [-33.879, 151.235] } },
                            directionsrenderer: { options: { directions: a, suppressMarkers: !0 } },
                            marker: {
                                values: [
                                    { latLng: e, options: { icon: "http://maps.google.com/mapfiles/ms/micons/truck.png" } },
                                    { latLng: o, options: { icon: "http://maps.google.com/mapfiles/ms/micons/blue-dot.png" } },
                                ],
                            },
                            autofit: {},
                        });
                    }
                },
            },
            trafficlayer: {},
        }),
        (teamMapLoaded = !0);
}
function createMapDirecciones(a) {
    $("#map").gmap3({ clear: { name: ["marker", "directionsrenderer", "trafficlayer"] } }),
        $("#map").gmap3({
            map: { options: { center: [46.578498, 2.457275], zoom: 5 } },
            marker: {
                values: a,
                options: { draggable: !1 },
                events: {
                    click: function (a, i, e) {
                        var o = e.id;
                        $("li[idequipo='" + o + "']").click();
                    },
                },
            },
            autofit: {},
        });
}
function avisoNuevaPS() {
    var a = URLAPI + "/equipos/pss/contar/filtrar?fecha1=" + fecha;
    jQuery.getJSON(a, function (a) {
        if (100 == a.codigo && PSActuales != a.contenido.contador) {
            var i = $("<span>Nueva PS en el sistema</span>").add($('<a class="btn-flat toast-action" href="index.php">Recargar</a>'));
            Materialize.toast(i, 1e4);
        }
    });
}
function loadPersonas() {
    var a, i;
    jQuery.getJSON(URLAPI + "/equipos/empleado/listado/oficina", function (e) {
        $.each(e.contenido, function (e, o) {
            (optionsSelectPersonas += '<option value="' + o.id + '">' + o.nombre + " " + o.apellido1 + " " + o.apellido2 + "</option>"),
                (a = o.id),
                (i = o.nombre + " " + o.apellido1 + " " + o.apellido2),
                listPersonas.push({ idPersona: a, nombrePersona: i });
        }),
            $("#personalSelect").append(optionsSelectPersonas),
            $("#personalSelectMantenimiento").append(optionsSelectPersonas),
            $("#personalSelectInforme").append(optionsSelectPersonas),
            $("#personalSelect").material_select(),
            $("#personalSelectMantenimiento").material_select(),
            $("#personalSelectInforme").material_select();
    });
}
function loadNaturaleza() {
    $.get(
        URLAPI + "/equipos/keyvalue/tipo_naturaleza_accion/",
        function (a) {
            $.each(a.contenido, function (a, i) {
                (optionsSelectNaturaleza += '<option value="' + i.id + '">' + i.tipo + "</option>"), listNaturalezas.push(i);
            });
        },
        "json"
    );
}
function loadUrgencia() {
    $.get(
        URLAPI + "/equipos/keyvalue/tipo_prioridad/",
        function (a) {
            $.each(a.contenido, function (a, i) {
                (optionsSelectUrgencia += '<option value="' + i.id + '">' + i.tipo + "</option>"), listUrgencias.push(i);
            });
        },
        "json"
    );
}
function ofertarMantenimiento(a, i, e, o) {
    var t = { idPS: a, idEmisor: i, idReceptor: e, text: o },
        n = URLAPI + "/equipos/tarea/ofertar_mantenimiento/emisor/" + i + "/receptor/" + e + "/ps/" + a + "?text=" + o;
    $.post(
        n,
        t,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && (Materialize.toast("Tarea enviada correctamente", 4e3), $("#ofertaMantenimiento").val(""));
        },
        "json"
    );
}
function ofertarServicio(a, i, e, o) {
    var t = { idPS: a, idEmisor: i, idReceptor: e, text: o },
        n = URLAPI + "/equipos/tarea/ofertar_servicio/emisor/" + i + "/receptor/" + e + "/ps/" + a + "?text=" + o;
    $.post(
        n,
        t,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && (Materialize.toast("Tarea enviada correctamente", 4e3), $("#ofertaServicio").val(""));
        },
        "json"
    );
}
function ofertarInforme(a, i, e, o) {
    var t = { idPS: a, idEmisor: i, idReceptor: e, text: o },
        n = URLAPI + "/equipos/tarea/informe_tecnico/emisor/" + i + "/receptor/" + e + "/ps/" + a + "?text=" + o;
    $.post(
        n,
        t,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && (Materialize.toast("Tarea enviada correctamente", 4e3), $("#ofertaInforme").val(""));
        },
        "json"
    );
}
function validarPS(a) {
    var i = { idPS: a };
    $.post(
        URLAPI + "/equipos/ps/validar/" + a,
        i,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && (Materialize.toast("PS validada correctamente", 4e3), (window.location.href = "./coordinadorPS.php?fecha1=" + fecha));
        },
        "json"
    );
}
function validarTodasInstalaciones(a, i) {
    var e = { idPS: a, idUsuario: i },
        o = URLAPI + "/equipos/ps/validacion/validar_todo/aspecto_tecnico/user/" + i + "/ps/" + a;
    $.post(
        o,
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Instalaciones validadas correctamente", 2e3, location.reload(!0));
        },
        "json"
    );
}
function editarUrgenciaPS(a, i) {
    var e = { idPS: a, idUrgencia: i };
    $.post(
        URLAPI + "/equipos/ps/" + a + "/urgencia/" + i,
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Urgencia de PS cambiada correctamente", 2e3, location.reload(!0));
        },
        "json"
    );
}
function editarEstadoPS(a, i) {
    var e = { idPS: a, idEstado: i };
    $.post(
        URLAPI + "/equipos/ps/" + a + "/estado/" + i + "/update",
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Estado de PS cambiado correctamente", 2e3, location.reload(!0));
        },
        "json"
    );
}

function editarEquipoPS(a, i) {
    var e = { idPS: a, idEquipo: i };
    //  URLAPI + "/equipos/equipo/" + i + "/update/ps/" + a
    $.post(
        URLAPI + "/equipos/equipo/" + i + "/update/ps/" + a,
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Equipo de PS cambiado correctamente", 2e3, location.reload(!0));
        },
        "json"
    );
}

function editarOperarioPS(a, i1, i2) {
    var e = { idPS: a, idOperario_antiguo: i1, idOperario_nuevo : i2 };
    //  URLAPI + "/equipos/equipo/" + i + "/update/ps/" + a
    $.post(
        URLAPI + "/equipos/replace_operario/ps/" + a + "/operario_antiguo/" + i1 + "/operario_nuevo/" + i2,
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Operario de Equipo de PS cambiado correctamente", 2e3, "");
        },
        "json"
    );
    document.getElementById("callback_" + i1).innerHTML = '<p style="color:green; font-weight:bold;"><span>&#10003;</span> Modificado correctamente!</p>';
    document.getElementById("callback_" + i1).style.marginBottom = "50px";
}

function editarNaturalezaPS(a, i) {
    var e = { idPS: a, idNaturaleza: i };
    $.post(
        URLAPI + "/equipos/ps/" + a + "/naturaleza/" + i,
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Naturaleza de PS cambiada correctamente", 2e3, location.reload(!0));
        },
        "json"
    );
}
function crearNuevaRevision(a, i, e) {
    var o = { idPS: a, idLugar: i },
        t = URLAPI + "/equipos/instalacion/tmp/lugar/" + i + "/ps/" + a + "?" + e;
    $.post(
        t,
        o,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Revisión de instalación creada correctamente", 2e3, location.reload(!0));
        },
        "json"
    );
}
function eliminarInstalacion(a) {
    var i = { idInstalacion: a },
        e = URLAPI + "/equipos/delete/instalacion/" + a;
    $.post(
        e,
        i,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Instalacion eliminada", 2e3, location.reload(!0));
        },
        "json"
    );
}
function intervenirInstalacion(a, i, e) {
    var o = { idInstalacion: a, idPS: i, idContrato: e },
        t = URLAPI + "/equipos/instalacion/realizada/" + a + "/ps/" + i + "?idContrato=" + e;
    $.post(
        t,
        o,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Instalacion intervenida", 2e3, location.reload(!0));
        },
        "json"
    );
}
function mantenimientoInstalacion(a, i, e) {
    var o = { idInstalacion: a, idPS: i, idContrato: e },
        t = "/equipos/instalacion/" + a + "/contrato/unset",
        n = "Contrato desasignado de la instalación";
    0 != e && ((t = "/equipos/instalacion/" + a + "/contrato/" + e), (n = "Contrato asignado a la instalación"));
    var c = URLAPI + t;
    $.post(
        c,
        o,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast(n, 2e3, location.reload(!0));
        },
        "json"
    );
}
function editarObservaciones(a, i) {
    var e = { idPS: a, observaciones: i },
        o = URLAPI + "/equipos/ps/" + a + "/update_observaciones?observaciones=" + i;
    $.post(
        o,
        e,
        function (a) {
            200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Observaciones actualizadas", 2e3, location.reload(!0));
        },
        "json"
    );
}
function editarNotaVital(a, i, e) {
    var o = { idPropietario: a, textAreaNotaVital: i, forced: e },
        t = URLAPI + "/equipos/nota_vital/lugar/" + a + "/update?nota_vital=" + i + "&forced=" + e;
    $.post(
        t,
        o,
        function (e) {
            300 == e.codigo ? Materialize.toast(e.detalles, 4e3) : 200 == e.codigo ? confirm(e.detalles) && editarNotaVital(a, i, 1) : 100 == e.codigo && Materialize.toast("Observaciones actualizadas", 2e3, location.reload(!0));
        },
        "json"
    );
}
function setEquipoAveriado(a) {
    var i = { idEquipo: a };
    $.post(
        URLAPI + "/equipos/equipo/averiado/" + a,
        i,
        function (i) {
            200 == i.codigo
                ? Materialize.toast(i.detalles, 4e3)
                : 100 == i.codigo &&
                  (Materialize.toast("Asignación realizada correctamente", 4e3), $("#equiposListCol .itemEquipo").hide(), $('li[idEquipo="' + a + '"]').show(), $("#infoPSEquipo .asignaPS").hide(), $("#infoPSEquipo .cancelarPS").show());
        },
        "json"
    );
}
function setEquipoArreglado(a) {
    var i = { idEquipo: a };
    $.post(
        URLAPI + "/equipos/equipo/arreglado/" + a,
        i,
        function (i) {
            200 == i.codigo
                ? Materialize.toast(i.detalles, 4e3)
                : 100 == i.codigo &&
                  (Materialize.toast("Asignación realizada correctamente", 4e3), $("#equiposListCol .itemEquipo").hide(), $('li[idEquipo="' + a + '"]').show(), $("#infoPSEquipo .asignaPS").hide(), $("#infoPSEquipo .cancelarPS").show());
        },
        "json"
    );
}
function listarEquiposAveriados() {
    var a = URLAPI + "/equipos/equipo/averiados";
    jQuery.getJSON(a, function (a) {
        if (100 == a.codigo && PSActuales != a.contenido.contador) {
            var i = $("<span>Nueva PS en el sistema</span>").add($('<a class="btn-flat toast-action" href="index.php">Recargar</a>'));
            Materialize.toast(i, 1e4);
        }
    });
}
function actualizarEstadoEqupo() {
    null != idEquipo &&
        jQuery.getJSON(URLAPI + "/equipos/equipo/" + idEquipo + "/detallado", function (a) {
            if (100 == a.codigo) {
                var i = $.grep(listPS, function (i) {
                    return i.id == a.contenido[1].PS_INFO.ps;
                });
                "0:00:00" != a.contenido[1].PS_INFO.hora_aviso ? $("#avisoPS").html("<br /> Aviso PS recibido: " + a.contenido[1].PS_INFO.hora_aviso) : $("#avisoPS").html(""),
                    "0:00:00" != a.contenido[1].PS_INFO.hora_llegada ? $("#llegadaPS").html("<br /> Hora llegada PS: " + a.contenido[1].PS_INFO.hora_llegada) : $("#llegadaPS").html(""),
                    "" != a.contenido[1].PS_INFO.tiempo_estimado_trabajo ? $("#tiempoTeorico").html("<br /> Tiempo teórico: " + 60 * a.contenido[1].PS_INFO.tiempo_estimado_trabajo + " minutos") : $("#tiempoTeorico").html(""),
                    createMapRutaEquipo(a.contenido[1].UBICACION.direccion_gps, i);
            }
        });
}
function replaceAll(a, i) {
    var e = new RegExp(Object.keys(i).join("|"), "gi");
    return a.replace(e, function (a) {
        return i[a];
    });
}
var PSAsignado,
    datepicked,
    datepicked2,
    idResponsableEquipo,
    Token,
    TokenID,
    listEquipos = [],
    listEstados = [],
    listTiposPS = [],
    listPersonas = [],
    listNaturalezas = [],
    listUrgencias = [],
    optionsSelectPersonas = "",
    optionsSelectUrgencia = "",
    optionsSelectNaturaleza = "",
    listPS = [],
    teamMapLoaded = !1,
    direccionesPS = [],
    direccionesEquipo = [],
    idPS = null,
    idLloc = null,
    litros_agua = null,
    idEquipo = null,
    PSActuales = 0,
    URLAPI = "http://app.aqualyt.net:5002",
    // URLAPI = "http://192.168.150.112:5002", // DEV
    fecha = moment().format("DD[/]MM[/]YYYY"),
    fecha2 = moment().format("DD[/]MM[/]YYYY"),
    hoy = new Date(moment().format("YYYY[,]MM[,]DD")),
    minFecha = moment().format("YYYY[/]MM[/]DD");
-1 != window.location.href.indexOf("?fecha1=") && ((fecha = window.location.href.substr(window.location.href.indexOf("?fecha1=") + 8, 10)), (minFecha = new Date(moment(fecha, "DD[/]MM[/]YYYY").format("YYYY[,]MM[,]DD")))),
    (fecha2 = -1 != window.location.href.indexOf("&fecha2=") ? window.location.href.substr(window.location.href.indexOf("&fecha2=") + 8, 10) : fecha),
    $("#selectorFecha").attr("data-value", fecha),
    $("#selectorFecha2").attr("data-value", fecha2),
    $(function () {
        function a(a) {
            jQuery.getJSON(URLAPI + "/equipos/instalacion/ps/" + a, function (a) {
                var i = 0,
                    e = !0;
                $("#imgPortada").hide(),
                    $("#imgPortadaBtn").hide(),
                    $("#imgInstalacion1").hide(),
                    $("#imgInstalacion2").hide(),
                    $("#imgInstalacion3").hide(),
                    $("#accordionModalInstalaciones").empty(),
                    100 == a.codigo &&
                        $.each(a.contenido, function (a, o) {
                            i++;
                            var t = "",
                                n = "",
                                c = "";
                            null != o.INSTALACION_LUGAR_ACTUACION.nombre_instalacion.valor && (t = '<span class="title">' + o.INSTALACION_LUGAR_ACTUACION.nombre_instalacion.valor + "</span>"),
                                1 == i && (c = "active"),
                                (n = '<li class="collection-item avatar instalacionItem"><i class="material-icons circle green"></i>' + t + "<p>" + o.INSTALACION_LUGAR_ACTUACION.observaciones + "</p>"),
                                o.INSTALACION_LUGAR_ACTUACION.fotos > 0 &&
                                    (n +=
                                        '<a href="#!" idInstalacion="' +
                                        o.INSTALACION_LUGAR_ACTUACION.id +
                                        '" class="secondary-content cargarImagenesInstalacion"><i class="material-icons ' +
                                        c +
                                        ' instalacionItemEye">remove_red_eye</i></a>'),
                                (n += "</li>"),
                                $("#accordionModalInstalaciones").append(n),
                                e &&
                                    (jQuery.getJSON(URLAPI + "/equipos/instalacion/galeria/supervisor/instalacion/" + o.INSTALACION_LUGAR_ACTUACION.id, function (a) {
                                        var i = 1;
                                        $.each(a.contenido, function (a, e) {
                                            (e.INSTALACION_GALERIA.portada || 1 == i) && ($("#imgPortada img").attr("src", "data:image/png;base64, " + e.INSTALACION_GALERIA.base64), $("#imgPortada").show(), $("#imgPortadaBtn").show()),
                                                $("#imgInstalacion" + i + " img").attr("src", "data:image/png;base64, " + e.INSTALACION_GALERIA.base64),
                                                $("#validarFotoInstalacion" + i).attr("idImagen", e.INSTALACION_GALERIA.idGaleria),
                                                $("#imgInstalacion" + i).show(),
                                                i++;
                                        });
                                    }),
                                    (e = !1));
                        }),
                    0 == i && $("#accordionModalInstalaciones").append('<li class="collection-item avatar"><i class="material-icons circle"></i><span class="title">No hay instalaciones</span><p></p></li>');
            });
        }
        function i(a) {
            jQuery.getJSON(URLAPI + "/equipos/instalacion/galeria/supervisor/instalacion/" + a, function (a) {
                var i = 1;
                $.each(a.contenido, function (a, e) {
                    (e.INSTALACION_GALERIA.portada || 1 == i) && ($("#imgPortada img").attr("src", "data:image/png;base64, " + e.INSTALACION_GALERIA.base64), $("#imgPortada").show(), $("#imgPortadaBtn").show()),
                        $("#imgInstalacion" + i + " img").attr("src", "data:image/png;base64, " + e.INSTALACION_GALERIA.base64),
                        $("#validarFotoInstalacion" + i).attr("idImagen", e.INSTALACION_GALERIA.idGaleria),
                        $("#imgInstalacion" + i).show(),
                        i++;
                });
            });
        }
        function e(a, i) {
            var e = { idDocumento: a };
            $.post(
                URLAPI + "/equipos/instalacion/validar_temporal/imagen/" + a,
                e,
                function (e) {
                    200 == e.codigo
                        ? Materialize.toast(e.detalles, 4e3)
                        : 100 == e.codigo &&
                          ($(".accionesImg" + a + " .validarFotoInstalacion").addClass("hide"),
                          $(".accionesImg" + a + " .rechazarFotoInstalacion").removeClass("hide"),
                          Materialize.toast("Imagen validada correctamente", 2e3),
                          $(".accionesImg" + a).attr("idEstadoValidacion", "2"),
                          c(i));
                },
                "json"
            );
        }
        function o(a, i) {
            var e = { idDocumento: a };
            $.post(
                URLAPI + "/equipos/instalacion/desechar_temporal/imagen/" + a,
                e,
                function (e) {
                    200 == e.codigo
                        ? Materialize.toast(e.detalles, 4e3)
                        : 100 == e.codigo &&
                          ($(".accionesImg" + a + " .validarFotoInstalacion").removeClass("hide"),
                          $(".accionesImg" + a + " .rechazarFotoInstalacion").addClass("hide"),
                          Materialize.toast("Imagen rechazada", 2e3),
                          $(".accionesImg" + a).attr("idEstadoValidacion", "3"),
                          c(i));
                },
                "json"
            );
        }
        function t(a, i) {
            var e = { idDocumento: a, idInstalacion: i };
            $.post(
                URLAPI + "/equipos/instalacion/validar_portada/doc/" + a + "/instalacion/" + i,
                e,
                function (a) {
                    200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Foto de portada validada correctamente", 2e3, location.reload(!0));
                },
                "json"
            );
        }
        function n(a, i) {
            var e = { idDocumento: a, idInstalacion: i };
            $.post(
                URLAPI + "/equipos/instalacion/delete_doc/doc/" + a,
                e,
                function (a) {
                    200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Foto de portada rechazada correctamente", 2e3, location.reload(!0));
                },
                "json"
            );
        }
        function c(a) {
            var i = $(".accionesInst" + a)
                    .map(function () {
                        return $(this).attr("idEstadoValidacion");
                    })
                    .get(),
                e = 0;
            i.forEach(function (a) {
                a > 1 && e++;
            }),
                e == i.length && ($("#modalInstalacion" + a).modal("close"), $("#modalValidarInstalacion" + a).modal("open"), $(".accionesBtns" + a).removeClass("hide"));
        }
        function r(a, i) {
            var e = { idInstalacion: a, idFrom: i };
            $.post(
                URLAPI + "/equipos/instalacion/validar_temporal/" + a + "?idInstalacion=" + i,
                e,
                function (a) {
                    200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Instalación validada correctamente", 2e3, location.reload(!0));
                },
                "json"
            );
        }
        function l(a) {
            var i = { idInstalacion: a };
            $.post(
                URLAPI + "/equipos/instalacion/desechar_temporal/" + a,
                i,
                function (a) {
                    200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Instalación rechazada", 2e3, location.reload(!0));
                },
                "json"
            );
        }
        function s(a) {
            var i = { idInstalacion: a },
                e = 0,
                o = "/equipos/instalacion/tmp/desactivar_mantenimiento/" + a;
            document.getElementById("intervenido" + a).checked && (e = 1), document.getElementById("mantenimiento" + a).checked && (o = "/equipos/instalacion/tmp/activar_mantenimiento/" + a);
            var t =
                URLAPI +
                "/equipos/instalacion/tmp/" +
                a +
                "/edit?rango=" +
                $("#RANGO" + a).val() +
                "&tipo_instalacion=" +
                $("#TIPO_INSTALACION" + a).val() +
                "&nombre=" +
                $("#NOMBRE_INSTALACION" + a).val() +
                "&material=" +
                $("#TIPO_MATERIAL" + a).val() +
                "&tipo_residuo=" +
                $("#TIPO_RESIDUO" + a).val() +
                "&tipo_ubicacion=" +
                $("#TIPO_UBICACION" + a).val() +
                "&numero=" +
                $("#cantidad" + a).val() +
                "&puerta=" +
                $("#TIPO_PUERTA" + a).val() +
                "&piso=" +
                $("#TIPO_PISO" + a).val() +
                "&escalera=" +
                $("#TIPO_ESCALERA" + a).val() +
                "&observaciones=" +
                $("#observaciones" + a).val() +
                "&intervenido=" +
                e;
            $.post(URLAPI + o, i, function (a) {}, "json"),
                $.ajax({
                    url: t,
                    type: "PUT",
                    data: i,
                    success: function (a) {
                        if (100 == a.codigo) {
                            var i = $("<span>Instalación editada</span>");
                            Materialize.toast(i, 2e3, location.reload(!0));
                        }
                    },
                });
        }
        function d(a, i, e) {
            var o = URLAPI + "/equipos/lugar_actuacion/" + a + "/atributos/edit/" + i + "?" + e;
            $.ajax({
                url: o,
                type: "PUT",
                data: e,
                contentType: "application/jsonp",
                success: function (a) {
                    if (100 == a.codigo) {
                        var i = $("<span>Atributos editados</span>");
                        Materialize.toast(i, 2e3, location.reload(!0));
                    }
                },
            });
        }
        function u(a, i, e) {
            var o = URLAPI + "/equipos/instalacion/lugar/" + a + "/ps/" + i + "?" + e,
                t = { idLloc: a, idPS: i };
            $.post(
                o,
                t,
                function (a) {
                    200 == a.codigo ? Materialize.toast(a.detalles, 4e3) : 100 == a.codigo && Materialize.toast("Nueva instalación creada correctamente", 2e3, location.reload(!0));
                },
                "json"
            );
        }
        function p(a, i) {
            var e = URLAPI + "/equipos/lugar_actuacion/" + a + "/atributos/validar/" + i,
                o = { idLugar: a, idAtributoLugar: i };
            $.ajax({
                url: e,
                type: "PUT",
                data: o,
                contentType: "application/jsonp",
                success: function (a) {
                    if (100 == a.codigo) {
                        var i = $("<span>Atributos validados</span>");
                        Materialize.toast(i, 2e3, location.reload(!0));
                    }
                },
            });
        }
        function m(a, i) {
            var e = URLAPI + "/equipos/lugar_actuacion/" + a + "/atributos/tmp/" + i + "/delete",
                o = { idLugar: a, idAtributoLugar: i };
            $.ajax({
                url: e,
                type: "PUT",
                data: o,
                contentType: "application/jsonp",
                success: function (a) {
                    if (100 == a.codigo) {
                        var i = $("<span>Atributos rechazados</span>");
                        Materialize.toast(i, 2e3, location.reload(!0));
                    }
                },
            });
        }
        (Token = Cookies.get("AquaCoordinadorToken")),
            (TokenID = Cookies.get("AquaCoordinadorTokenID")),
            $.ajaxSetup({ cache: !1, headers: { token: Token, "Content-Type": "application/json" } }),
            column_sizer(),
            $(window).resize(column_sizer);
        var f = $(location).attr("pathname").split("/").pop();
        "index.php" == f || "" == f ? loadEquiposList() : "coordinadorPS.php" == f ? (loadPSList(0, 7), loadEquiposmenu(), loadPersonasmenu()) : "tareas.php" == f && loadTareasList(0),
            loadPersonas(),
            loadUrgencia(),
            loadNaturaleza(),
            $("#filtroFecha").html(fecha),
            $("#filtroFecha2").html(fecha2),
            $("#filtroFechaMobile").html(fecha),
            $("#filtroFecha2Mobile").html(fecha2),
            $("select").material_select({ dropdownOptions: { container: ".modal-content" } }),
            $("#modalPS").modal(),
            $("#modalValidarPS").modal(),
            $("#modalValidarInstalaciones").modal(),
            $("#crearInstalacion").modal(),
            $("#modalOfertarServicio").modal(),
            $("#modalOfertarMantenimiento").modal(),
            $("#modalInformeTV").modal(),
            $(".modal").modal(),
            $(".modalFotografias").modal(),
            $(".button-collapse").sideNav(),
            $("ul.tabs").tabs(),
            $(".datepicker").pickadate({
                weekdaysFull: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"],
                monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                firstDay: 1,
                selectMonths: !0,
                selectYears: 2,
                max: hoy,
                today: "Hoy",
                clear: "Limpiar",
                close: "Seleccionar",
                closeOnSelect: !1,
                labelMonthNext: "Mes siguiente",
                labelMonthPrev: "Mes anterior",
                labelMonthSelect: "Selecciona un mes del desplegable",
                labelYearSelect: "Selecciona un año del desplegable",
                container: "body",
                formatSubmit: "dd/mm/yyyy",
                onClose: function () {
                    null != datepicked && "Invalid date" != datepicked && window.location.replace(window.location.pathname + "?fecha1=" + datepicked);
                },
                onSet: function (a) {
                    datepicked = moment(a.select, "x").format("DD[/]MM[/]YYYY");
                },
            }),
            $(".datepicker2").pickadate({
                weekdaysFull: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"],
                monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                firstDay: 1,
                selectMonths: !0,
                selectYears: 2,
                min: minFecha,
                max: hoy,
                today: "Hoy",
                clear: "Limpiar",
                close: "Seleccionar",
                closeOnSelect: !1,
                labelMonthNext: "Mes siguiente",
                labelMonthPrev: "Mes anterior",
                labelMonthSelect: "Selecciona un mes del desplegable",
                labelYearSelect: "Selecciona un año del desplegable",
                container: "body",
                formatSubmit: "dd/mm/yyyy",
                onClose: function () {
                    null != datepicked2 && "Invalid date" != datepicked2 && window.location.replace(window.location.pathname + "?fecha1=" + fecha + "&fecha2=" + datepicked2);
                },
                onSet: function (a) {
                    datepicked2 = moment(a.select, "x").format("DD[/]MM[/]YYYY");
                },
            }),
            $("#mostrarPendientes").on("click", function () {
                $("#infoPS").hide(), loadPSList(0, 7);
            }),
            $("#mostrarValidadas").on("click", function () {
                $("#infoPS").hide(), loadPSList(1, 7);
            }),
            $("#mostrarAnuladas").on("click", function () {
                $("#infoPS").hide(), loadPSList(0, 3);
            }),
            $("#mostrarNoRealizadas").on("click", function () {
                $("#infoPS").hide(), loadPSList(0, 6);
            }),
            $("#mostrarTodas").on("click", function () {
                $("#infoPS").hide(), loadPSList(null, 7);
            }),
            $(".collectionEquiposMenu").on("click", ".filtrarEquipo", function () {
                $("#infoPS").hide(), $(".filtrarEquipo").removeClass("active"), $(this).addClass("active");
                var a = $(this).attr("idEquipo");
                loadPSListEquipo(a);
            }),
            $(".collectionPersonasMenu").on("click", ".filtrarPersona", function () {
                $("#infoPS").hide(), $(".filtrarPersona").removeClass("active"), $(this).addClass("active");
                var a = $(this).attr("idPersona");
                loadPSListPersona(a);
            }),
            $("#tareaMantenimientoBtn").on("click", function () {
                var a = $("#ofertaMantenimiento").val(),
                    i = $("#personalSelectMantenimiento").val(),
                    e = $(this).attr("idPS");
                null != i && "" != a ? ofertarMantenimiento(e, TokenID, i, a) : alert("Es necesario seleccionar un destinatario y añadir un mensaje para crear la tarea");
            }),
            $("#tareaServicioBtn").on("click", function () {
                var a = $("#ofertaServicio").val(),
                    i = $("#personalSelect").val(),
                    e = $(this).attr("idPS");
                null != i && "" != a ? ofertarServicio(e, TokenID, i, a) : alert("Es necesario seleccionar un destinatario y añadir un mensaje para crear la tarea");
            }),
            $("#tareaInformeBtn").on("click", function () {
                var a = $("#ofertaInforme").val(),
                    i = $("#personalSelectInforme").val(),
                    e = $(this).attr("idPS");
                null != i && "" != a ? ofertarInforme(e, TokenID, i, a) : alert("Es necesario seleccionar un destinatario y añadir un mensaje para crear la tarea");
            }),
            $(".itemPSList").on("click", ".itemPSAll", function (a) {
                a.preventDefault(), (window.location.href = window.location.href.replace(/[\?#].*|$/, "?clean"));
            }),
            $("#equiposListCol").on("click", ".itemEquipo", function (a) {
                a.preventDefault(),
                    $("#equiposListCol .itemEquipo").removeClass("itemPSSelected"),
                    $(".collection-item.itemPS").removeClass("itemPSSelected"),
                    $(this).addClass("itemPSSelected"),
                    (idPS = $(this).attr("idPS")),
                    (idEquipo = $(this).attr("idEquipo")),
                    $("#ofertaServicio").val(""),
                    "0" != idPS &&
                        jQuery.getJSON(URLAPI + "/equipos/pss/filtrar?id=" + idPS, function (a) {
                            if (200 != a.codigo) {
                                (idLloc = a.contenido[1].id_lugar_actuacion), (litros_agua = a.contenido[1].litros_agua);
                                var i = getArrayItembyValue(listEquipos, idEquipo),
                                    e = !1;
                                "0:00:00" != a.contenido[1].hora_llegada && (e = !0),
                                    createMapRutaEquipo(i[0].UBICACION, a.contenido[1], e),
                                    $("#infoPS").fadeIn("slow"),
                                    $("#infoIDPS").html('<a href="http://app.aqualyt.net/sf/action.php?SOURCE=PS2&amp;ACTION=SHOWINITIAL&amp;LOAD_PS=' + a.contenido[1].id + '" target="_blank">PS: ' + a.contenido[1].id + "</a>"),
                                    $("#infoLugar").html(
                                        '<a href="#" class="irLugar" idLugar="' +
                                            a.contenido[1].id_lugar_actuacion +
                                            '">Lugar: ' +
                                            a.contenido[1].id_lugar_actuacion +
                                            '</a><form id="LLOCEDIT' +
                                            a.contenido[1].id_lugar_actuacion +
                                            '" action="http://app.aqualyt.net/sf/action.php" method="POST" style="display:none;" target="_blank"><input id="nav_llocedit" name="nav_lloc_edit" type="submit" value="' +
                                            a.contenido[1].id_lugar_actuacion +
                                            '" title="ir al Lloc"><input type="hidden" id="ACTIONLLOCEDIT" name="ACTION" value="EDITAR_EXTERNO"><input type="hidden" id="SOURCELLOC" name="SOURCE" value="LUGAR_ACTUACION"><input type="hidden" id="IDLLOCEDIT" name="ID" value="' +
                                            a.contenido[1].id_lugar_actuacion +
                                            '"></form>'
                                    ),
                                    $("#informePS").html(
                                        '<a href="http://app.aqualyt.net/sf/action.php?SOURCE=PS2&ACTION=SHOWINITIAL&LOAD_PS=' +
                                            a.contenido[1].id +
                                            '&TAB=Docu.%20PS|docu_ps#" target="_blank" class="waves-effect waves-teal btn col s12 orange">Doc. PS</a>'
                                    ),
                                    $("#infoEstado").html(a.contenido[1].estado_string),
                                    $("#infoNaturaleza").html(a.contenido[1].naturaleza_string),
                                    $("#infoTipo").html(a.contenido[1].tipo_string),
                                    $("#infoUrgencia").html(a.contenido[1].urgencia_string),
                                    $("#infoDireccion").html(a.contenido[1].direccion),
                                    $("#infoResponsable").html(a.contenido[1].direccion),
                                    $("#infoAgente").html(a.contenido[1].agente_nombre),
                                    (idResponsableEquipo = a.contenido[1].responsable_equipo),
                                    "" != a.contenido[1].problema && $("#infoProblema").html(a.contenido[1].problema),
                                    "" != a.contenido[1].notas ? ($("#collapsibleinfoNotas").show(), $("#infoNotas").html(a.contenido[1].notas)) : $("#collapsibleinfoNotas").hide(),
                                    "" != a.contenido[1].nota_vital ? ($("#collapsibleinfoNotaVital").show(), $("#infoNotaVital").html(a.contenido[1].nota_vital)) : $("#collapsibleinfoNotaVital").hide(),
                                    7 == a.contenido[1].estado_id ? $("#validarBoton").removeClass("disabled") : $("#validarBoton").addClass("disabled");
                            } else $("#infoPS").hide(), Materialize.toast("No tiene PS asignada", 4e3);
                        });
            }),
            $("#equiposListCol").on("click", ".itemPS", function (a) {
                a.preventDefault(),
                    $("#equiposListCol .itemEquipo").removeClass("itemPSSelected"),
                    $(".collection-item.itemPS").removeClass("itemPSSelected"),
                    $(this).addClass("itemPSSelected"),
                    (idPS = $(this).attr("idPS")),
                    (idEquipo = $(this).attr("idEquipo")),
                    $("#ofertaServicio").val(""),
                    "0" != idPS &&
                        jQuery.getJSON(URLAPI + "/equipos/pss/filtrar?id=" + idPS, function (a) {
                            if (
                                ((idLloc = a.contenido[1].id_lugar_actuacion),
                                (litros_agua = a.contenido[1].litros_agua),
                                $("#infoPS").fadeIn("slow"),
                                $("#infoIDPS").html('<a href="http://app.aqualyt.net/sf/action.php?SOURCE=PS2&amp;ACTION=SHOWINITIAL&amp;LOAD_PS=' + a.contenido[1].id + '" target="_blank">PS: ' + a.contenido[1].id + "</a>"),
                                $("#infoLugar").html(
                                    '<a href="#" class="irLugar" idLugar="' +
                                        a.contenido[1].id_lugar_actuacion +
                                        '">Lugar: ' +
                                        a.contenido[1].id_lugar_actuacion +
                                        '</a><form id="LLOCEDIT' +
                                        a.contenido[1].id_lugar_actuacion +
                                        '" action="http://app.aqualyt.net/sf/action.php" method="POST" style="display:none;" target="_blank"><input id="nav_llocedit" name="nav_lloc_edit" type="submit" value="' +
                                        a.contenido[1].id_lugar_actuacion +
                                        '" title="ir al Lloc"><input type="hidden" id="ACTIONLLOCEDIT" name="ACTION" value="EDITAR_EXTERNO"><input type="hidden" id="SOURCELLOC" name="SOURCE" value="LUGAR_ACTUACION"><input type="hidden" id="IDLLOCEDIT" name="ID" value="' +
                                        a.contenido[1].id_lugar_actuacion +
                                        '"></form>'
                                ),
                                $("#informePS").html(
                                    '<a href="http://app.aqualyt.net/sf/action.php?SOURCE=PS2&ACTION=SHOWINITIAL&LOAD_PS=' +
                                        a.contenido[1].id +
                                        '&TAB=Docu.%20PS|docu_ps#" target="_blank" class="waves-effect waves-teal btn col s12 orange">Informe técnico</a>'
                                ),
                                $("#infoEstado").html(a.contenido[1].estado_string),
                                $("#infoNaturaleza").html(a.contenido[1].naturaleza_string),
                                $("#infoTipo").html(a.contenido[1].tipo_string),
                                $("#infoUrgencia").html(a.contenido[1].urgencia_string),
                                $("#infoDireccion").html(a.contenido[1].direccion),
                                $("#infoResponsable").html(a.contenido[1].direccion),
                                $("#infoSolicitante").html(a.contenido[1].solicitante_nombre),
                                $("#infoCliente").html(a.contenido[1].cliente_nombre),
                                $("#infoAgente").html(a.contenido[1].agente_nombre),
                                $("#infoAgenteCobro").html(a.contenido[1].agente_cobro_nombre),
                                $("#infoAdministrador").html(a.contenido[1].administrador_nombre + " " + a.contenido[1].administrador_telefono),
                                a.contenido[1].equipo_asignado)
                            ) {
                                $(".equipoPS").show(), $("#EquipoNombre").html(a.contenido[1].equipo_asignado);
                                var i = a.contenido[1].componentes;
                                $("#equipoPersonas").empty();
                                for (const a in i)
                                    if (i.hasOwnProperty(a)) {
                                        const e = i[a];
                                        $("#equipoPersonas").append("<li>" + e.NOMBRE + "</li>");
                                    }
                            } else $(".equipoPS").hide();
                            (idResponsableEquipo = a.contenido[1].responsable_equipo),
                                "" != a.contenido[1].problema && $("#infoProblema").html(a.contenido[1].problema),
                                "" != a.contenido[1].notas ? ($("#collapsibleinfoNotas").show(), $("#infoNotas").html(a.contenido[1].notas)) : $("#collapsibleinfoNotas").hide(),
                                "" != a.contenido[1].nota_vital
                                    ? ($("#collapsibleinfoNotaVital").show(),
                                      $("#infoNotaVital").html(a.contenido[1].nota_vital),
                                      $("#textAreaNotaVital").val(a.contenido[1].nota_vital),
                                      $("#textAreaNotaVital").trigger("autoresize"),
                                      $("#idPropietario").val(a.contenido[1].id_lugar_actuacion))
                                    : $("#collapsibleinfoNotaVital").hide(),
                                7 == a.contenido[1].estado_id ? ($("#revisarPSButton").show(), $("#validarBoton").removeClass("disabled")) : ($("#revisarPSButton").hide(), $("#validarBoton").addClass("disabled"));
                        });
            }),
            $("#modalValidarPS").on("click", "#validarBtn", function (a) {
                var i = $(this).attr("idPS");
                validarPS(i);
            }),
            $("#modalValidarInstalaciones").on("click", "#validarBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $(this).attr("idUsuario");
                validarTodasInstalaciones(i, e);
            }),
            $("#editarUrgencia").on("click", "#editarUrgenciaBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $("#URGENCIA" + i).val();
                editarUrgenciaPS(i, e);
            }),
            $("#editarEstado").on("click", "#editarEstadoBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $("#ESTADO" + i).val();
                editarEstadoPS(i, e);
            }),
          /*$("#editarOperario").on("click", "#editarOperarioBtn", function (a) {
                var i1 = $(this).attr("idOperario"),
                    a = $(this).attr("idPS"),
                    i2 = $("#OPERARIOS" + i1).val();
                
                editarOperarioPS(a, i1, i2);
            }),*/

        
         $("#editarOperario").on("click", "#guardarCambiosOperarios", function (a) {
                var i = $(this).attr("cantidad_botones");
                let e;
                console.log()
                for (e=0; e<=i; e++) {
                    $("#editarOperarioBtn" + e).click()
                }
              // location.reload(!0);3
                setTimeout(
                    function(){ location.reload(!0); },
                    1000
                );
           }),
           




            $("#editarEquipo").on("click", "#editarEquipoBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $("#EQUIPO" + i).val();
                editarEquipoPS(i, e);
            }),
            $("#editarNaturaleza").on("click", "#editarNaturalezaBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $("#NATURALEZA" + i).val();
                editarNaturalezaPS(i, e);
            }),
            $("#modalCancelar").on("click", "#desasignarPSaEquipo", function (a) {
                desasignarPSEquipo(idPS, idEquipo);
            }),
            $(".card-content").on("click", "#revisarPS", function (i) {
                a(idPS), (window.location.href = "./instalaciones.php?fecha1=" + fecha + "&idPS=" + idPS + "&idLloc=" + idLloc + "&litrosAgua=" + litros_agua);
            }),
            $("#accordionModalInstalaciones").on("click", ".cargarImagenesInstalacion", function (a) {
                $(".instalacionItemEye").removeClass("active"), $(this).children().addClass("active"), i($(this).attr("idInstalacion"));
            }),
            $(".validarFotoInstalacion").on("click", function (a) {
                e($(this).attr("idDocumento"), $(this).attr("idInstalacion"));
            }),
            $(".rechazarFotoInstalacion").on("click", function (a) {
                o($(this).attr("idDocumento"), $(this).attr("idInstalacion"));
            }),
            $(".validarFotoPortada").on("click", function (a) {
                confirm("¿Validar foto de portada?") && t($(this).attr("idDocumento"), $(this).attr("idInstalacion"));
            }),
            $(".rechazarFotoPortada").on("click", function (a) {
                confirm("¿Rechazar foto de portada?") && n($(this).attr("idDocumento"), $(this).attr("idInstalacion"));
            }),
            $(".validarInstalacionBtn").on("click", function (a) {
                r($(this).attr("idInstalacion"), $(this).attr("idFrom"));
            }),
            $(".rechazarInstalacionBtn").on("click", function (a) {
                l($(this).attr("idInstalacion"));
            }),
            $(".validarEdicionBtn").on("click", function (a) {
                s($(this).attr("idInstalacion"));
            }),
            $("#crearInstalacionBtn").on("click", function (a) {
                var i = $(this).attr("idPS"),
                    e = $(this).attr("idLloc"),
                    o = $("#creacionInstalacion").serialize() + "&numero=1",
                    t = {
                        RANGONueva: "rango",
                        TIPO_INSTALACIONNueva: "tipo_instalacion",
                        NOMBRE_INSTALACIONNueva: "nombre",
                        TIPO_MATERIALNueva: "material",
                        TIPO_RESIDUONueva: "tipo_residuo",
                        TIPO_UBICACIONNueva: "tipo_ubicacion",
                        TIPO_PISONueva: "piso",
                        TIPO_PUERTANueva: "puerta",
                        TIPO_ESCALERANueva: "escalera",
                        observacionesNueva: "observaciones",
                    };
                (o = replaceAll(o, t)), u(e, i, o);
            }),
            $("#editarAtributosBtn").on("click", function (a) {
                d($(this).attr("idLloc"), $(this).attr("idAtributoLugar"), $("#edicionAtributos").serialize());
            }),
            $("#validarAtributosBtn").on("click", function (a) {
                p($(this).attr("idLloc"), $(this).attr("idAtributoLugar"));
            }),
            $("#rechazarAtributosBtn").on("click", function (a) {
                m($(this).attr("idLloc"), $(this).attr("idAtributoLugar"));
            }),
            $(".revisarInstalacion").on("click", "#crearRevisionBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $(this).attr("idLugar"),
                    o = $(this).attr("idInstalacion"),
                    t = $("#formInstalacion" + o).serialize();
                crearNuevaRevision(i, e, t);
            }),
            $(".eliminarInstalacion").on("click", "#eliminarInstalacionBtn", function (a) {
                var i = $(this).attr("idInstalacion");
                eliminarInstalacion(i);
            }),
            $(".intervenirInstalacion").on("click", "#intervenirInstalacionBtn", function (a) {
                var i = $(this).attr("idInstalacion"),
                    e = $(this).attr("idPS"),
                    o = $(this).attr("idContrato");
                intervenirInstalacion(i, e, o);
            }),
            $(".mantenimientoInstalacion").on("click", "#mantenimientoInstalacionBtn", function (a) {
                var i = $(this).attr("idInstalacion"),
                    e = $(this).attr("idPS"),
                    o = $("#CONTRATOS_MANTENIMIENTO" + i).val();
                mantenimientoInstalacion(i, e, o);
            }),
            $(".editarObservaciones").on("click", "#editarObservacionBtn", function (a) {
                var i = $(this).attr("idPS"),
                    e = $("#textAreaObservaciones").val();
                editarObservaciones(i, e);
            }),
            $(".editarNotaVital").on("click", "#editarNotaVitalBtn", function (a) {
                var i = $("#idPropietario").val(),
                    e = $("#textAreaNotaVital").val();
                editarNotaVital(i, e, 0);
            });
    });
var autocomplete,
    psLocationMapLoaded = !1;
$(document).on("click", ".subtareas", function () {
    var a = $(this).attr("idTarea");
    $("#personalSelect" + a).append(optionsSelectPersonas),
        $("#prioridadSelect" + a).append(optionsSelectUrgencia),
        $("#naturalezaSelect" + a).append(optionsSelectNaturaleza),
        $("#personalSelect" + a).material_select(),
        $("#prioridadSelect" + a).material_select(),
        $("#naturalezaSelect" + a).material_select(),
        $(".itemSubtarea" + a).toggle();
}),
    $(document).on("click", ".cerrartarea", function () {
        var a = $(this).attr("idTarea");
        $("#" + a).toggle();
    }),
    $(document).on("click", ".addSubtarea", function () {
        var a = $(this).attr("idTarea"),
            i = $("#subtarea" + a).val(),
            e = $("#personalSelect" + a).val(),
            o = $("#prioridadSelect" + a).val(),
            t = $("#naturalezaSelect" + a).val();
        null == e && (e = $(".itemSubtarea" + a + "Form").attr("destinatariotarea")), null == o && (o = $(".itemSubtarea" + a + "Form").attr("prioridadtarea")), null == t && (t = $(".itemSubtarea" + a + "Form").attr("naturalezatarea"));
        var n = { idTarea: a, texto: i, idDestinatario: e, idPrioridad: o, idNaturaleza: t };
        $.post(
            URLAPI + "/equipos/tarea/" + a + "/crear_subtarea/user/" + TokenID + "?texto=" + i,
            n,
            function (i) {
                200 == i.codigo
                    ? Materialize.toast(i.detalles, 4e3)
                    : 100 == i.codigo &&
                      $.ajax({ method: "PUT", url: URLAPI + "/equipos/tarea/" + a + "/cambiar_receptor/" + e + "/naturaleza/" + t + "/urgencia/" + o, data: n, dataType: "json" }).done(function () {
                          200 == i.codigo ? Materialize.toast(i.detalles, 4e3) : 100 == i.codigo && (Materialize.toast("Subtarea enviada correctamente", 4e3), $("#subtarea" + a).val(""));
                      });
            },
            "json"
        );
    }),
    $("#tareasListCol, .card-content").on("click", ".irLugar", function () {
        var a = $(this).attr("idLugar");
        $("#LLOCEDIT" + a).submit();
    }),
    $("h4.titleInstalacion").on("click", ".irLugar", function () {
        var a = $(this).attr("idLugar");
        $("#LLOCEDIT" + a).submit();
    }),
    $("h4.titleInstalacion").on("click", ".irMantenimiento", function () {
        $(this).attr("idMantenimiento");
        $("#EDITCONTRATO_MNT").submit();
    }),
    $("#modalOfertarServicio").on("click", "#ofertarFormBtn", function () {
        $("#PS_To_Ofs").submit();
    }),
    $("#modalOfertarMantenimiento").on("click", "#ofertarMantFormBtn", function () {
        $("#PS_To_OfM").submit();
    }),
    $("#modalInformeTV").on("click", "#informeFormBtn", function () {
        $("#crear_informe_de_ps").submit();
    }),
    $("#equiposListCol").on("input", "#buscador", function (a) {
        var i = $("#buscador").val().toUpperCase();
        i.length > 3 ? $("li.itemPS:not([idps*='" + i + "'])").hide() : $("li.itemPS").show();
    });
