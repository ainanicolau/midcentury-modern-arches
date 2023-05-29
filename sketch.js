let canvas;
let canvas_height = window.innerHeight - 100 - 63;
let canvas_width = Math.round(canvas_height / 1.41);

const UPLOAD_DOWNSCALE = 2;

const DIMENSIONS = {
    'a1': [7016, 9933],
    'a2': [4690, 7016],
    'a3': [3508, 4690],
    'a4': [2480, 3508],
    'a5': [1748, 2480],
}

let background_color = [240, 232, 221];

// Shape 1
let n_waves = 4;
let radius_out = 0.1125;
let radius_in = radius_out;
let n_arches = 7;
let arch_space = 0.0125;
let line_length = 0.25;
let position_x = 0.5;
let position_y = 0.5;
let stroke_weight = 0.0075;
let end_length = 0.5;
let angle = 0;
let scale = 1;
let is_visible = true;
let shape_color = [0, 0, 0];

// Shape 2
let n_waves_2 = 4;
let radius_out_2 = 0.1125;
let radius_in_2 = radius_out_2;
let n_arches_2 = 7;
let arch_space_2 = 0.0125;
let line_length_2 = 0.25;
let position_x_2 = 0.5;
let position_y_2 = 0.5;
let stroke_weight_2 = 0.0075;
let end_length_2 = 0.5;
let angle_2 = 180;
let scale_2 = 1;
let is_visible_2 = false;
let shape_color_2 = [0, 0, 0];

// Circle 1
let circle_1_visible = false;
let circle_1_color = [0, 0, 0];
let circle_1_x = 0.2;
let circle_1_y = 0.2;
let circle_1_r = 0.05;

// Circle 2
let circle_2_visible = false;
let circle_2_color = [0, 0, 0];
let circle_2_x = 0.3;
let circle_2_y = 0.3;
let circle_2_r = 0.05;

// Semi-Circle 1
let semicircle_1_visible = false;
let semicircle_1_color = [0, 0, 0];
let semicircle_1_x = 0.2;
let semicircle_1_y = 0.2;
let semicircle_1_r = 0.05;
let semicircle_1_angle = 0;

// Semi-Circle 2
let semicircle_2_visible = false;
let semicircle_2_color = [0, 0, 0];
let semicircle_2_x = 0.4;
let semicircle_2_y = 0.4;
let semicircle_2_r = 0.05;
let semicircle_2_angle = 0;


function setup()
{
    // GENERAL
    general_box = createDiv();
    general_box.parent("parameters-container");
    general_box.addClass("box");
    general_box_title = createElement('h1', 'GENERAL');
    general_box_title.parent(general_box);

    let bg_color_label = createP('Background Color');
    bg_color_label.parent(general_box);
    bg_color_picker = createColorPicker(color(background_color).toString('#rrggbb'));
    bg_color_picker.input(on_bg_color_picker_changed);
    bg_color_picker.parent(general_box);

    // ARCH 1 PARAMETERS
    arch_1_box = createDiv();
    arch_1_box.parent("parameters-container");
    arch_1_box.addClass("box");
    arch_1_box_title = createElement('h1', 'ARCH 1 PARAMETERS');
    arch_1_box_title.parent(arch_1_box);

    general_options_group = createDiv();
    general_options_group.parent(arch_1_box);
    general_options_group.addClass("group");

    let visible_checkbox_label = createP('Visible');
    visible_checkbox_label.parent(general_options_group);
    visible_checkbox = createCheckbox('', is_visible);
    visible_checkbox.input(on_visible_checkbox_changed);
    visible_checkbox.parent(general_options_group);

    let color_label = createP('Color');
    color_label.parent(general_options_group);
    color_picker = createColorPicker(color(shape_color).toString('#rrggbb'));
    color_picker.input(on_color_picker_changed);
    color_picker.parent(general_options_group);

    amounts_label_group = createDiv();
    amounts_label_group.parent(arch_1_box);
    amounts_label_group.addClass("group");

    amounts_slider_group = createDiv();
    amounts_slider_group.parent(arch_1_box);
    amounts_slider_group.addClass("group");

    let n_arches_label = createP('Number of Arches');
    n_arches_label.parent(amounts_label_group);
    n_arches_slider = createSlider(1, 10, n_arches);
    n_arches_slider.input(on_n_arches_changed);
    n_arches_slider.parent(amounts_slider_group);

    let n_waves_label = createP('Number of Waves');
    n_waves_label.parent(amounts_label_group);
    n_waves_slider = createSlider(1, 10, n_waves);
    n_waves_slider.input(on_n_waves_changed);
    n_waves_slider.parent(amounts_slider_group);

    weights_label_group = createDiv();
    weights_label_group.parent(arch_1_box);
    weights_label_group.addClass("group");

    weights_slider_group = createDiv();
    weights_slider_group.parent(arch_1_box);
    weights_slider_group.addClass("group");

    let stroke_weight_label = createP('Stroke Weight');
    stroke_weight_label.parent(weights_label_group);
    stroke_weight_slider = createSlider(0.001, 0.02, stroke_weight, 0.0005);
    stroke_weight_slider.input(on_stroke_weight_changed);
    stroke_weight_slider.parent(weights_slider_group);

    let arch_space_label = createP('Arch Space');
    arch_space_label.parent(weights_label_group);
    arch_space_slider = createSlider(0, 0.05, arch_space, 0.0005);
    arch_space_slider.input(on_arch_space_changed);
    arch_space_slider.parent(weights_slider_group);

    line_label_group = createDiv();
    line_label_group.parent(arch_1_box);
    line_label_group.addClass("group");

    line_slider_group = createDiv();
    line_slider_group.parent(arch_1_box);
    line_slider_group.addClass("group");

    let line_length_label = createP('Line length');
    line_length_label.parent(line_label_group);
    line_length_slider = createSlider(0, 1, line_length, 0.01);
    line_length_slider.input(on_line_length_changed);
    line_length_slider.parent(line_slider_group);

    let end_length_label = createP('End length');
    end_length_label.parent(line_label_group);
    end_length_slider = createSlider(0, 5, end_length, 0.1);
    end_length_slider.input(on_end_length_changed);
    end_length_slider.parent(line_slider_group);

    transform_label_group = createDiv();
    transform_label_group.parent(arch_1_box);
    transform_label_group.addClass("group");

    transform_slider_group = createDiv();
    transform_slider_group.parent(arch_1_box);
    transform_slider_group.addClass("group");

    let rotation_label = createP('Rotation');
    rotation_label.parent(transform_label_group);
    rotation_slider = createSlider(0, 360, angle, 45);
    rotation_slider.input(on_rotation_changed);
    rotation_slider.parent(transform_slider_group);

    let scale_label = createP('Scale');
    scale_label.parent(transform_label_group);
    scale_slider = createSlider(0.2, 5, scale, 0.2);
    scale_slider.input(on_scale_changed);
    scale_slider.parent(transform_slider_group);

    position_label_group = createDiv();
    position_label_group.parent(arch_1_box);
    position_label_group.addClass("group");

    position_slider_group = createDiv();
    position_slider_group.parent(arch_1_box);
    position_slider_group.addClass("group");

    let position_x_label = createP('Position X');
    position_x_label.parent(position_label_group);
    position_x_slider = createSlider(0, 1, position_x, 0.02);
    position_x_slider.input(on_position_x_changed);
    position_x_slider.parent(position_slider_group);

    let position_y_label = createP('Position Y');
    position_y_label.parent(position_label_group);
    position_y_slider = createSlider(0, 1, position_y, 0.02);
    position_y_slider.input(on_position_y_changed);
    position_y_slider.parent(position_slider_group);

    // ARCH 2 PARAMETERS
    arch_2_box = createDiv();
    arch_2_box.parent("parameters-container");
    arch_2_box.addClass("box");
    arch_2_box_title = createElement('h1', 'ARCH 2 PARAMETERS');
    arch_2_box_title.parent(arch_2_box);

    general_options_group_2 = createDiv();
    general_options_group_2.parent(arch_2_box);
    general_options_group_2.addClass("group");

    let visible_checkbox_label_2 = createP('Visible');
    visible_checkbox_label_2.parent(general_options_group_2);
    visible_checkbox_2 = createCheckbox('', is_visible_2);
    visible_checkbox_2.input(on_visible_checkbox_2_changed);
    visible_checkbox_2.parent(general_options_group_2);

    let color_label_2 = createP('Color');
    color_label_2.parent(general_options_group_2);
    color_picker_2 = createColorPicker(color(shape_color_2).toString('#rrggbb'));
    color_picker_2.input(on_color_picker_2_changed);
    color_picker_2.parent(general_options_group_2);

    amounts_label_group_2 = createDiv();
    amounts_label_group_2.parent(arch_2_box);
    amounts_label_group_2.addClass("group");

    amounts_slider_group_2 = createDiv();
    amounts_slider_group_2.parent(arch_2_box);
    amounts_slider_group_2.addClass("group");

    let n_arches_label_2 = createP('Number of Arches');
    n_arches_label_2.parent(amounts_label_group_2);
    n_arches_slider_2 = createSlider(1, 10, n_arches_2);
    n_arches_slider_2.input(on_n_arches_2_changed);
    n_arches_slider_2.parent(amounts_slider_group_2);

    let n_waves_label_2 = createP('Number of Waves');
    n_waves_label_2.parent(amounts_label_group_2);
    n_waves_slider_2 = createSlider(1, 10, n_waves_2);
    n_waves_slider_2.input(on_n_waves_2_changed);
    n_waves_slider_2.parent(amounts_slider_group_2);

    weights_label_group_2 = createDiv();
    weights_label_group_2.parent(arch_2_box);
    weights_label_group_2.addClass("group");

    weights_slider_group_2 = createDiv();
    weights_slider_group_2.parent(arch_2_box);
    weights_slider_group_2.addClass("group");

    let stroke_weight_label_2 = createP('Stroke Weight');
    stroke_weight_label_2.parent(weights_label_group_2);
    stroke_weight_slider_2 = createSlider(0.001, 0.02, stroke_weight_2, 0.0005);
    stroke_weight_slider_2.input(on_stroke_weight_2_changed);
    stroke_weight_slider_2.parent(weights_slider_group_2);

    let arch_space_label_2 = createP('Arch Space');
    arch_space_label_2.parent(weights_label_group_2);
    arch_space_slider_2 = createSlider(0, 0.05, arch_space_2, 0.0005);
    arch_space_slider_2.input(on_arch_space_2_changed);
    arch_space_slider_2.parent(weights_slider_group_2);

    line_label_group_2 = createDiv();
    line_label_group_2.parent(arch_2_box);
    line_label_group_2.addClass("group");

    line_slider_group_2 = createDiv();
    line_slider_group_2.parent(arch_2_box);
    line_slider_group_2.addClass("group");

    let line_length_label_2 = createP('Line length');
    line_length_label_2.parent(line_label_group_2);
    line_length_slider_2 = createSlider(0, 1, line_length_2, 0.01);
    line_length_slider_2.input(on_line_length_2_changed);
    line_length_slider_2.parent(line_slider_group_2);

    let end_length_label_2 = createP('End length');
    end_length_label_2.parent(line_label_group_2);
    end_length_slider_2 = createSlider(0, 5, end_length_2, 0.1);
    end_length_slider_2.input(on_end_length_2_changed);
    end_length_slider_2.parent(line_slider_group_2);

    transform_label_group_2 = createDiv();
    transform_label_group_2.parent(arch_2_box);
    transform_label_group_2.addClass("group");

    transform_slider_group_2 = createDiv();
    transform_slider_group_2.parent(arch_2_box);
    transform_slider_group_2.addClass("group");

    let rotation_label_2 = createP('Rotation');
    rotation_label_2.parent(transform_label_group_2);
    rotation_slider_2 = createSlider(0, 360, angle_2, 45);
    rotation_slider_2.input(on_rotation_2_changed);
    rotation_slider_2.parent(transform_slider_group_2);

    let scale_label_2 = createP('Scale');
    scale_label_2.parent(transform_label_group_2);
    scale_slider_2 = createSlider(0.2, 5, scale_2, 0.2);
    scale_slider_2.input(on_scale_2_changed);
    scale_slider_2.parent(transform_slider_group_2);

    position_label_group_2 = createDiv();
    position_label_group_2.parent(arch_2_box);
    position_label_group_2.addClass("group");

    position_slider_group_2 = createDiv();
    position_slider_group_2.parent(arch_2_box);
    position_slider_group_2.addClass("group");

    let position_x_label_2 = createP('Position X');
    position_x_label_2.parent(position_label_group_2);
    position_x_slider_2 = createSlider(0, 1, position_x_2, 0.02);
    position_x_slider_2.input(on_position_x_2_changed);
    position_x_slider_2.parent(position_slider_group_2);

    let position_y_label_2 = createP('Position Y');
    position_y_label_2.parent(position_label_group_2);
    position_y_slider_2 = createSlider(0, 1, position_y_2, 0.02);
    position_y_slider_2.input(on_position_y_2_changed);
    position_y_slider_2.parent(position_slider_group_2);

    // CIRCLE 1 PARAMETERS
    circle_1_box = createDiv();
    circle_1_box.parent("parameters-container");
    circle_1_box.addClass("box");
    circle_1_box_title = createElement('h1', 'CIRCLE 1 PARAMETERS');
    circle_1_box_title.parent(circle_1_box);

    circle_1_box_general_options_group = createDiv();
    circle_1_box_general_options_group.parent(circle_1_box);
    circle_1_box_general_options_group.addClass("group");

    let circle_1_visible_checkbox_label = createP('Visible');
    circle_1_visible_checkbox_label.parent(circle_1_box_general_options_group);
    circle_1_visible_checkbox = createCheckbox('', circle_1_visible);
    circle_1_visible_checkbox.input(on_circle_1_visible_checkbox_changed);
    circle_1_visible_checkbox.parent(circle_1_box_general_options_group);

    let circle_color_1_label = createP('Color');
    circle_color_1_label.parent(circle_1_box_general_options_group);
    circle_color_1_picker = createColorPicker(color(circle_1_color).toString('#rrggbb'));
    circle_color_1_picker.input(on_circle_color_1_picker_changed);
    circle_color_1_picker.parent(circle_1_box_general_options_group);

    circle_1_position_label_group = createDiv();
    circle_1_position_label_group.parent(circle_1_box);
    circle_1_position_label_group.addClass("group");

    circle_1_position_group = createDiv();
    circle_1_position_group.parent(circle_1_box);
    circle_1_position_group.addClass("group");

    let circle_1_x_label = createP('Position X');
    circle_1_x_label.parent(circle_1_position_label_group);
    circle_1_x_slider = createSlider(0, 1, circle_1_x, 0.01);
    circle_1_x_slider.input(on_circle_1_x_changed);
    circle_1_x_slider.parent(circle_1_position_group);

    let circle_1_y_label = createP('Position Y');
    circle_1_y_label.parent(circle_1_position_label_group);
    circle_1_y_slider = createSlider(0, 1, circle_1_y, 0.01);
    circle_1_y_slider.input(on_circle_1_y_changed);
    circle_1_y_slider.parent(circle_1_position_group);

    let circle_1_r_label = createP('Radius');
    circle_1_r_label.parent(circle_1_box);
    circle_1_r_slider = createSlider(0, 1, circle_1_r, 0.01);
    circle_1_r_slider.input(on_circle_1_r_changed);
    circle_1_r_slider.parent(circle_1_box);

    // CIRCLE 2 PARAMETERS
    circle_2_box = createDiv();
    circle_2_box.parent("parameters-container");
    circle_2_box.addClass("box");
    circle_2_box_title = createElement('h1', 'CIRCLE 2 PARAMETERS');
    circle_2_box_title.parent(circle_2_box);

    circle_2_box_general_options_group = createDiv();
    circle_2_box_general_options_group.parent(circle_2_box);
    circle_2_box_general_options_group.addClass("group");

    let circle_2_visible_checkbox_label = createP('Visible');
    circle_2_visible_checkbox_label.parent(circle_2_box_general_options_group);
    circle_2_visible_checkbox = createCheckbox('', circle_2_visible);
    circle_2_visible_checkbox.input(on_circle_2_visible_checkbox_changed);
    circle_2_visible_checkbox.parent(circle_2_box_general_options_group);

    let circle_color_2_label = createP('Color');
    circle_color_2_label.parent(circle_2_box_general_options_group);
    circle_color_2_picker = createColorPicker(color(circle_2_color).toString('#rrggbb'));
    circle_color_2_picker.input(on_circle_color_2_picker_changed);
    circle_color_2_picker.parent(circle_2_box_general_options_group);

    circle_2_position_label_group = createDiv();
    circle_2_position_label_group.parent(circle_2_box);
    circle_2_position_label_group.addClass("group");

    circle_2_position_group = createDiv();
    circle_2_position_group.parent(circle_2_box);
    circle_2_position_group.addClass("group");

    let circle_2_x_label = createP('Position X');
    circle_2_x_label.parent(circle_2_position_label_group);
    circle_2_x_slider = createSlider(0, 1, circle_2_x, 0.01);
    circle_2_x_slider.input(on_circle_2_x_changed);
    circle_2_x_slider.parent(circle_2_position_group);

    let circle_2_y_label = createP('Position Y');
    circle_2_y_label.parent(circle_2_position_label_group);
    circle_2_y_slider = createSlider(0, 1, circle_2_y, 0.01);
    circle_2_y_slider.input(on_circle_2_y_changed);
    circle_2_y_slider.parent(circle_2_position_group);

    let circle_2_r_label = createP('Radius');
    circle_2_r_label.parent(circle_2_box);
    circle_2_r_slider = createSlider(0, 1, circle_2_r, 0.01);
    circle_2_r_slider.input(on_circle_2_r_changed);
    circle_2_r_slider.parent(circle_2_box);

    // SEMI-CIRCLE 1 PARAMETERS
    semicircle_1_box = createDiv();
    semicircle_1_box.parent("parameters-container");
    semicircle_1_box.addClass("box");
    semicircle_1_box_title = createElement('h1', 'SEMI-CIRCLE 1 PARAMETERS');
    semicircle_1_box_title.parent(semicircle_1_box);

    semicircle_1_box_general_options_group = createDiv();
    semicircle_1_box_general_options_group.parent(semicircle_1_box);
    semicircle_1_box_general_options_group.addClass("group");

    let semicircle_1_visible_checkbox_label = createP('Visible');
    semicircle_1_visible_checkbox_label.parent(semicircle_1_box_general_options_group);
    semicircle_1_visible_checkbox = createCheckbox('', semicircle_1_visible);
    semicircle_1_visible_checkbox.input(on_semicircle_1_visible_checkbox_changed);
    semicircle_1_visible_checkbox.parent(semicircle_1_box_general_options_group);

    let semicircle_color_1_label = createP('Color');
    semicircle_color_1_label.parent(semicircle_1_box_general_options_group);
    semicircle_color_1_picker = createColorPicker(color(semicircle_1_color).toString('#rrggbb'));
    semicircle_color_1_picker.input(on_semicircle_color_1_picker_changed);
    semicircle_color_1_picker.parent(semicircle_1_box_general_options_group);

    semicircle_1_position_label_group = createDiv();
    semicircle_1_position_label_group.parent(semicircle_1_box);
    semicircle_1_position_label_group.addClass("group");

    semicircle_1_position_group = createDiv();
    semicircle_1_position_group.parent(semicircle_1_box);
    semicircle_1_position_group.addClass("group");

    let semicircle_1_x_label = createP('Position X');
    semicircle_1_x_label.parent(semicircle_1_position_label_group);
    semicircle_1_x_slider = createSlider(0, 1, semicircle_1_x, 0.01);
    semicircle_1_x_slider.input(on_semicircle_1_x_changed);
    semicircle_1_x_slider.parent(semicircle_1_position_group);

    let semicircle_1_y_label = createP('Position Y');
    semicircle_1_y_label.parent(semicircle_1_position_label_group);
    semicircle_1_y_slider = createSlider(0, 1, semicircle_1_y, 0.01);
    semicircle_1_y_slider.input(on_semicircle_1_y_changed);
    semicircle_1_y_slider.parent(semicircle_1_position_group);

    semicircle_1_shape_label_group = createDiv();
    semicircle_1_shape_label_group.parent(semicircle_1_box);
    semicircle_1_shape_label_group.addClass("group");

    semicircle_1_shape_group = createDiv();
    semicircle_1_shape_group.parent(semicircle_1_box);
    semicircle_1_shape_group.addClass("group");

    let semicircle_1_r_label = createP('Radius');
    semicircle_1_r_label.parent(semicircle_1_shape_label_group);
    semicircle_1_r_slider = createSlider(0, 1, semicircle_1_r, 0.01);
    semicircle_1_r_slider.input(on_semicircle_1_r_changed);
    semicircle_1_r_slider.parent(semicircle_1_shape_group);

    let semicircle_1_angle_label = createP('Rotation');
    semicircle_1_angle_label.parent(semicircle_1_shape_label_group);
    semicircle_1_angle_slider = createSlider(0, 360, semicircle_1_angle, 45);
    semicircle_1_angle_slider.input(on_semicircle_1_angle_changed);
    semicircle_1_angle_slider.parent(semicircle_1_shape_group);

    // SEMI-CIRCLE 2 PARAMETERS
    semicircle_2_box = createDiv();
    semicircle_2_box.parent("parameters-container");
    semicircle_2_box.addClass("box");
    semicircle_2_box_title = createElement('h1', 'SEMI-CIRCLE 2 PARAMETERS');
    semicircle_2_box_title.parent(semicircle_2_box);

    semicircle_2_box_general_options_group = createDiv();
    semicircle_2_box_general_options_group.parent(semicircle_2_box);
    semicircle_2_box_general_options_group.addClass("group");

    let semicircle_2_visible_checkbox_label = createP('Visible');
    semicircle_2_visible_checkbox_label.parent(semicircle_2_box_general_options_group);
    semicircle_2_visible_checkbox = createCheckbox('', semicircle_2_visible);
    semicircle_2_visible_checkbox.input(on_semicircle_2_visible_checkbox_changed);
    semicircle_2_visible_checkbox.parent(semicircle_2_box_general_options_group);

    let semicircle_color_2_label = createP('Color');
    semicircle_color_2_label.parent(semicircle_2_box_general_options_group);
    semicircle_color_2_picker = createColorPicker(color(semicircle_2_color).toString('#rrggbb'));
    semicircle_color_2_picker.input(on_semicircle_color_2_picker_changed);
    semicircle_color_2_picker.parent(semicircle_2_box_general_options_group);

    semicircle_2_position_label_group = createDiv();
    semicircle_2_position_label_group.parent(semicircle_2_box);
    semicircle_2_position_label_group.addClass("group");

    semicircle_2_position_group = createDiv();
    semicircle_2_position_group.parent(semicircle_2_box);
    semicircle_2_position_group.addClass("group");

    let semicircle_2_x_label = createP('Position X');
    semicircle_2_x_label.parent(semicircle_2_position_label_group);
    semicircle_2_x_slider = createSlider(0, 1, semicircle_2_x, 0.01);
    semicircle_2_x_slider.input(on_semicircle_2_x_changed);
    semicircle_2_x_slider.parent(semicircle_2_position_group);

    let semicircle_2_y_label = createP('Position Y');
    semicircle_2_y_label.parent(semicircle_2_position_label_group);
    semicircle_2_y_slider = createSlider(0, 1, semicircle_2_y, 0.01);
    semicircle_2_y_slider.input(on_semicircle_2_y_changed);
    semicircle_2_y_slider.parent(semicircle_2_position_group);

    semicircle_2_shape_label_group = createDiv();
    semicircle_2_shape_label_group.parent(semicircle_2_box);
    semicircle_2_shape_label_group.addClass("group");

    semicircle_2_shape_group = createDiv();
    semicircle_2_shape_group.parent(semicircle_2_box);
    semicircle_2_shape_group.addClass("group");

    let semicircle_2_r_label = createP('Radius');
    semicircle_2_r_label.parent(semicircle_2_shape_label_group);
    semicircle_2_r_slider = createSlider(0, 1, semicircle_2_r, 0.01);
    semicircle_2_r_slider.input(on_semicircle_2_r_changed);
    semicircle_2_r_slider.parent(semicircle_2_shape_group);

    let semicircle_2_angle_label = createP('Rotation');
    semicircle_2_angle_label.parent(semicircle_2_shape_label_group);
    semicircle_2_angle_slider = createSlider(0, 360, semicircle_2_angle, 45);
    semicircle_2_angle_slider.input(on_semicircle_2_angle_changed);
    semicircle_2_angle_slider.parent(semicircle_2_shape_group);

    // To guarantee an exact download resolution.
    pixelDensity(1);

    // Create Canvas
    canvas = create_canvas(canvas_width, canvas_height);

    // Update canvas with initial parameters.
    update_canvas();
}

function create_canvas(width, height)
{
    canvas = createCanvas(canvas_width, canvas_height);
    canvas.style("background", "#FFFFFF");
    canvas.style("border-radius", "50px");
    canvas.style("box-shadow", "0px 4px 30px rgba(0, 0, 0, 0.02)");
    canvas.parent("canvas-element");
}

function on_bg_color_picker_changed()
{
    input_color = this.value();
    background_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_visible_checkbox_changed()
{
    is_visible = this.checked()
    update_canvas();
}

function on_color_picker_changed()
{
    input_color = this.value();
    shape_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_n_arches_changed()
{
    n_arches = this.value();
    update_canvas();
}

function on_n_waves_changed()
{
    n_waves = this.value();
    update_canvas();
}

function on_stroke_weight_changed()
{
    stroke_weight = this.value();
    update_canvas();
}

function on_arch_space_changed()
{
    arch_space = this.value();
    update_canvas();  
}

function on_line_length_changed()
{
    line_length = this.value();
    update_canvas();
}

function on_end_length_changed()
{
    end_length = this.value();
    update_canvas();
}

function on_rotation_changed()
{
    angle = this.value();
    update_canvas();
}

function on_scale_changed()
{
    scale = this.value();
    update_canvas();
}

function on_position_x_changed()
{
    position_x = this.value();
    update_canvas();
}

function on_position_y_changed()
{
    position_y = this.value();
    update_canvas();
}

function on_background_color_picker_changed()
{
    input_color = this.value();
    background_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_visible_checkbox_2_changed()
{
    is_visible_2 = this.checked()
    update_canvas();
}

function on_color_picker_2_changed()
{
    input_color = this.value();
    shape_color_2 = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_n_arches_2_changed()
{
    n_arches_2 = this.value();
    update_canvas();
}

function on_n_waves_2_changed()
{
    n_waves_2 = this.value();
    update_canvas();
}

function on_stroke_weight_2_changed()
{
    stroke_weight_2 = this.value();
    update_canvas();
}

function on_arch_space_2_changed()
{
    arch_space_2 = this.value();
    update_canvas();
}

function on_line_length_2_changed()
{
    line_length_2 = this.value();
    update_canvas();
}

function on_end_length_2_changed()
{
    end_length_2 = this.value();
    update_canvas();
}

function on_rotation_2_changed()
{
    angle_2 = this.value();
    update_canvas();
}

function on_scale_2_changed()
{
    scale_2 = this.value();
    update_canvas();
}

function on_position_x_2_changed()
{
    position_x_2 = this.value();
    update_canvas();
}

function on_position_y_2_changed()
{
    position_y_2 = this.value();
    update_canvas();
}

function on_circle_1_visible_checkbox_changed()
{
    circle_1_visible = this.checked();
    update_canvas();
}

function on_circle_color_1_picker_changed()
{
    input_color = this.value();
    circle_1_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_circle_1_x_changed()
{
    circle_1_x = this.value();
    update_canvas();
}

function on_circle_1_y_changed()
{
    circle_1_y = this.value();
    update_canvas();
}

function on_circle_1_r_changed()
{
    circle_1_r = this.value();
    update_canvas();
}

function on_circle_2_visible_checkbox_changed()
{
    circle_2_visible = this.checked();
    update_canvas();
}

function on_circle_color_2_picker_changed()
{
    input_color = this.value();
    circle_2_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_circle_2_x_changed()
{
    circle_2_x = this.value();
    update_canvas();
}

function on_circle_2_y_changed()
{
    circle_2_y = this.value();
    update_canvas();
}

function on_circle_2_r_changed()
{
    circle_2_r = this.value();
    update_canvas();
}

function on_semicircle_1_visible_checkbox_changed()
{
    semicircle_1_visible = this.checked();
    update_canvas();
}

function on_semicircle_color_1_picker_changed()
{
    input_color = this.value();
    semicircle_1_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_semicircle_1_x_changed()
{
    semicircle_1_x = this.value();
    update_canvas();
}

function on_semicircle_1_y_changed()
{
    semicircle_1_y = this.value();
    update_canvas();
}

function on_semicircle_1_r_changed()
{
    semicircle_1_r = this.value();
    update_canvas();
}

function on_semicircle_1_angle_changed()
{
    semicircle_1_angle = this.value();
    update_canvas();
}

function on_semicircle_2_visible_checkbox_changed()
{
    semicircle_2_visible = this.checked();
    update_canvas();
}

function on_semicircle_color_2_picker_changed()
{
    input_color = this.value();
    semicircle_2_color = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function on_semicircle_2_x_changed()
{
    semicircle_2_x = this.value();
    update_canvas();
}

function on_semicircle_2_y_changed()
{
    semicircle_2_y = this.value();
    update_canvas();
}

function on_semicircle_2_r_changed()
{
    semicircle_2_r = this.value();
    update_canvas();
}

function on_semicircle_2_angle_changed()
{
    semicircle_2_angle = this.value();
    update_canvas();
}

function on_background_color_picker_2_changed()
{
    input_color = this.value();
    background_color_2 = [red(input_color), green(input_color), blue(input_color)];
    update_canvas();
}

function update_canvas()
{
    const img = create_image(canvas_width, canvas_height);
    image(img, 0, 0, canvas_width, canvas_height);
}

function download_image(format, filename)
{
    img = create_image(DIMENSIONS[format][0], DIMENSIONS[format][1]);
    save(img, filename);
}

function create_image(width, height)
{
    let img = createGraphics(width, height);
    img.background(background_color);

    if (circle_1_visible)
    {
        img = draw_circle(img, width, height, circle_1_color, circle_1_r, circle_1_x, circle_1_y);
    }

    if (circle_2_visible)
    {
        img = draw_circle(img, width, height, circle_2_color, circle_2_r, circle_2_x, circle_2_y);
    }

    if (semicircle_1_visible)
    {
        img = draw_semicircle(img, width, height, semicircle_1_color, semicircle_1_r, semicircle_1_angle,
                              semicircle_1_x, semicircle_1_y);
    }

    if (semicircle_2_visible)
    {
        img = draw_semicircle(img, width, height, semicircle_2_color, semicircle_2_r, semicircle_2_angle,
                              semicircle_2_x, semicircle_2_y);
    }

    if (is_visible)
    {
        img = draw_shape(img, width, height, stroke_weight, position_x, position_y, angle, scale, shape_color, n_waves,
                         n_arches, arch_space, radius_out, radius_in, line_length, end_length)
    }

    if (is_visible_2)
    {
        img = draw_shape(img, width, height, stroke_weight_2, position_x_2, position_y_2, angle_2, scale_2, shape_color_2, n_waves_2,
                         n_arches_2, arch_space_2, radius_out_2, radius_in_2, line_length_2, end_length_2)
    }

    return img;

}

function draw_shape(img, width, height, stroke_weight, position_x, position_y, angle, scale, shape_color, n_waves,
                    n_arches, arch_space, radius_out, radius_in, line_length, end_length)
{
    img.push()
    img.strokeWeight(stroke_weight * width);
    img.noFill();

    img.translate(position_x * width, (1 - position_y) * height);
    img.rotate(radians(angle));
    img.scale(scale);
    img.stroke(shape_color)

    for(let wave = 0; wave<n_waves; wave++)
    {
        for(let arch = 0; arch<n_arches; arch++)
        {
            let a_spacing = arch_space * width * arch;
            let radius = radius_out * width - a_spacing;
            let w_spacing = (radius_out  * width + radius_in) * wave;
            img.arc(w_spacing, line_length * height * (wave%2), radius*2, radius*2, PI * ((wave+1)%2), PI * (wave%2));

            if(wave==0)
            {
                img.line(- radius + w_spacing, 0, - radius + w_spacing, line_length * height * end_length);

            }else
            {
                img.line(- radius + w_spacing, 0, - radius + w_spacing, line_length * height);
            }

            if(wave == n_waves-1)
            {
                if(wave%2 == 0 && n_waves%2 == 1)
                {
                    img.line(radius + w_spacing, 0, radius + w_spacing, line_length * height * end_length);
                }
                else
                {
                    img.line(radius + w_spacing, line_length * height * (1-end_length), radius + w_spacing, line_length * height);
                }
            }

            if(arch == n_arches-1 && wave==0){
                radius_in = radius;
            }
        }
    }
    img.pop()

    return img
}

function draw_circle(img, width, height, circle_color, circle_r, circle_x, circle_y)
{
    img.push();
    img.fill(circle_color);
    img.noStroke();
    img.circle(circle_x * width, (1 - circle_y) * height, circle_r * 2 * width);
    img.pop();

    return img
}

function draw_semicircle(img, width, height, semicircle_color, semicircle_r, semicircle_angle, semicircle_x, semicircle_y)
{
    img.push();
    img.fill(semicircle_color);
    img.noStroke();
    img.translate(semicircle_x * width, (1 - semicircle_y) * height)
    img.rotate(radians(semicircle_angle));
    img.arc(0, 0, semicircle_r * 2 * width, semicircle_r * 2 * width, PI, 0);
    img.pop();

    return img
}

function windowResized()
{
    canvas_height = window.innerHeight - 100 - 63;
    canvas_width = Math.round(canvas_height / 1.41);
    canvas = create_canvas(canvas_width, canvas_height);
    update_canvas();
}
